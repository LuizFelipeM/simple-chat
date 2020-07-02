import redis from 'redis';
import { promisify } from 'util';

import cacheKey from './cacheKeyService';
import { ChatsContentsDto } from '../interfaces/Dtos/ChatsContentsDto';

/* ----- TODO -----

    Melhorar e refatorar redis, separar e isolar conceitos
    separar instancia de client e bindings
*/
const redisStartup = () => {
    const redisOptions: redis.ClientOpts = {
        host: process.env.CACHE_HOST,
        port: process.env.CACHE_PORT ? parseInt(process.env.CACHE_PORT) : undefined,
        auth_pass: process.env.CACHE_AUTH_PASS ?? undefined
    }

    let canRun = true
    const redisClient = redis.createClient(redisOptions)

    redisClient.on('error', err => {
        console.log('ERROR: Occured on cache, error:', err)
        canRun = false
    })

    if(canRun) { // TODO - Retirar isso e melhorar a forma de se rodar este evento
        redisClient.FLUSHALL((err) => { if(err) console.log('ERROR: Occured during FLUSHALL, error:', err) })
    }

    const hgetAll = promisify(redisClient.HGETALL).bind(redisClient)
    const zRange = promisify(redisClient.ZRANGE).bind(redisClient)
    const hGet = promisify(redisClient.HGET).bind(redisClient)

    return {
        getAllData: async (key: string, id: string | number) => await hgetAll(cacheKey.generateKeyName(key, id)),

        setData: (key: string, id: string | number, field: string, value: string) => {
            const Key = cacheKey.generateKeyName(key, id)

            redisClient.HSET(Key, field, value)
        },

        getDataByField: async (key: string | number, field: string) => await hGet(cacheKey.chatKeyName(key), field),

        getAllMessages: async (chat_id: number) => (await zRange(cacheKey.chatKeyName(chat_id), 0, -1) as string[]).map(chatContent => JSON.parse(chatContent)),

        setMessage: (message: ChatsContentsDto) => {
            const score = Date.now()
            const key = cacheKey.chatKeyName(message.chat_id)

            redisClient.ZADD(key, score, JSON.stringify(message))
        },

        getAllMessagesByChat: (chatIds: number[]) => {
            const chatsContents = chatIds.map(async id => ( { [id]: await zRange(cacheKey.chatKeyName(id), 0, -1) as string[] } ))

            return chatsContents
        }
    }
}

export default redisStartup();