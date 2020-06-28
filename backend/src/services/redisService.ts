import redis from 'redis';
import { promisify } from 'util';

import ICacheService from "./interfaces/ICacheService";
import IChatsContentsRepository from '../interfaces/repositories/IChatsContentsRepository';
import IChatsService from './interfaces/IChatsService';

import cacheKey from './cacheKeyService';
import { ChatsContentsDto } from '../interfaces/Dtos/ChatsContentsDto';

const redisOptions: redis.ClientOpts = {
    host: process.env.CACHE_HOST,
    port: Number(process.env.CACHE_PORT)
}

function redisStartup(
    chatsContentsRepo: IChatsContentsRepository,
    // chatsService: IChatsService
): ICacheService {
    if(process.env.CACHE_AUTH_PASS)
        redisOptions.auth_pass = process.env.CACHE_AUTH_PASS;

    let canRun = true;
    const cacheClient = redis.createClient(redisOptions);
    cacheClient.on('error', (err) => {
        console.log('ERROR: Occured on cache, error:', err);
        canRun = false;
    });

    if(canRun) { // TODO - Retirar isso e melhorar a forma de se rodar este evento
        cacheClient.FLUSHALL((err) => { if(err) console.log('ERROR: Occured during FLUSHALL, error:', err) })
    }

    const hgetAll = promisify(cacheClient.HGETALL).bind(cacheClient);
    const zRange = promisify(cacheClient.ZRANGE).bind(cacheClient);
    const time = promisify(cacheClient.TIME).bind(cacheClient);
    const hGet = promisify(cacheClient.HGET).bind(cacheClient);

    const redisService: ICacheService = {
        async getAllData(key: string | number) { return await hgetAll(cacheKey.keyName(key)) },

        setData(key: string | number, field: string, value: string) {
            cacheClient.HSET(
                cacheKey.keyName(key),
                field,
                value
            )
        },

        async getDataByField(key: string | number, field: string) {
            return await hGet(cacheKey.keyName(key), field)
        },

        async getAllMessages(chat_id: number) { return await zRange(cacheKey.keyName(chat_id), 0, -1) as string[] },

        async setMessage(message: ChatsContentsDto): Promise<void> {
            const redisTime = await time()
            const score = redisTime.join('')
            const key = cacheKey.keyName(message.chat_id)

            console.log('key', key)

            cacheClient.ZADD(
                key,
                score,
                JSON.stringify(message)
            )
        },

        async getAllMessagesByChat(chatIds: number[]) {
            const chatsContents = chatIds.map(async id => ( { [id]: await zRange(cacheKey.keyName(id), 0, -1) as string[] } ))

            return chatsContents
        }
    };

    return redisService;
}

export default redisStartup;