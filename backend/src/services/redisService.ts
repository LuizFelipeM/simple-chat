import redis from 'redis';
import { promisify } from 'util';

import ICacheService from "./interfaces/ICacheService";
import IChatsContentsRepository from '../interfaces/repositories/IChatsContentsRepository';
import IChatsService from './interfaces/IChatsService';

import cacheKey from './cacheKeyService';

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
        cacheClient.FLUSHALL((err) => console.log('ERROR: Occured during FLUSHALL, error:', err))
    }

    const hgetAll = promisify(cacheClient.HGETALL).bind(cacheClient);
    const zRange = promisify(cacheClient.ZRANGE).bind(cacheClient);

    const redisService: ICacheService = {
        async getAllData(key) { return await hgetAll(cacheKey.keyName(key)) },

        setData(key, field, value) {
            cacheClient.HSET(
                cacheKey.keyName(key),
                field,
                value
            )
        },

        async getAllMessages(chat_id) { return await zRange(cacheKey.keyName(chat_id), 0, -1) },

        setMessage(message) {
            cacheClient.ZADD(
                cacheKey.keyName(message.chat_id),
                0, // Score - TODO: Ajustar o score para realmente ordenar a lista
                JSON.stringify(message.message)
            )
        },
    };

    return redisService;
}

export default redisStartup;