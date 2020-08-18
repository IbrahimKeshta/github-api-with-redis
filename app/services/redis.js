import redisConfiguration from '../config/redis';
import {promisify} from 'util'

export default class redisServices extends redisConfiguration {
    constructor() {
        super()
        this._asyncSetex = promisify(super.redisClient.setex).bind(super.redisClient);
        this._asyncGet = promisify(super.redisClient.get).bind(super.redisClient);
    }

    async addWithTTL(key,time,value){
        return this._asyncSetex(key,time,JSON.stringify(value))
    }
    async getByKey(key){
        return await this._asyncGet(key);
    }
}
