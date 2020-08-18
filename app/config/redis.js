import redis from 'redis';

export default class redisConfiguration {
    constructor() {
        this._redis = redis.createClient(process.env.REDIS_PORT);
        this._redis.on("error", err => {
            process.nextTick(() => {
                console.error("Redis not connected", err.message)
                this._redis.end(true);
                redis.debug_mode = false;
              });
        })
        this._redis.on("connect", res => {
            console.log("Redis connected Successful", this.redisClient.connection_id);
        })
        
    }

    get redisClient() {
        return this._redis;
    }
    get redisIsConnented(){
        return this._redis.connected
    }
}
