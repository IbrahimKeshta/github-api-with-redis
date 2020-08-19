import redis from 'redis';

/**
 * @class RedisConfiguration
 *  Initialize redis connection and handle error event to be monitor
 * when integrate monitoring system
 * @property redisClient
 *  return redis after creating Client connection
 * to be used in extends
 */
export default class RedisConfiguration {
    constructor() {
        this._redis = redis.createClient(process.env.REDIS_PORT);
        this._redis.on("error", err => {
            process.nextTick(() => {
                /**
                 * TODO : monitoring system for error
                 */
                console.error("Redis not connected", err.message)
                this._redis.end(true);
                redis.debug_mode = false;
              });
        })
        // this._redis.on("connect", res => {
        //     console.log("redis connection stablished ID:", this.redisClient.connection_id);
        // })
        
    }

    get redisClient() {
        return this._redis;
    }
    get redisIsConnented(){
        return this._redis.connected
    }
}
