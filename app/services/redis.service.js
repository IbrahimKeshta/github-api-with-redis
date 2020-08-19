import RedisConfiguration from '../config/redis.conf';
import {promisify} from 'util'

/**
 * @class RedisServices
 * It extends RedisConfiguration connect and use super redisClient
 * create async functions from setex, get, flushall
 * @method addWithTTL(key,timeInSeconds,value) - store data in redis with expire time
 * @method getByKey(key) - return data from redis
 * @method flushData() - clear all keys in redis
 * 
 */
export default class RedisServices extends RedisConfiguration {
    constructor() {
        super()
        this._asyncSetex = promisify(super.redisClient.setex).bind(super.redisClient);
        this._asyncGet = promisify(super.redisClient.get).bind(super.redisClient);
        this._asyncFlush = promisify(super.redisClient.flushall).bind(super.redisClient)
    }

    async addWithTTL(key,time,value){
        return this._asyncSetex(key,time,JSON.stringify(value))
    }
    async getByKey(key){
        return await this._asyncGet(key);
    }
    async flushData(){
        return await this._asyncFlush()
    }
}
