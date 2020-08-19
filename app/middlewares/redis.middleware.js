import RedisServices from '../services/redis.service';

/**
 * @class RedisMiddlware
 * This is the middleware that chech is the requested data available
 * in cache it will be returned if not it pass next() to continue the request
 * and fetch data to be stored in redis
 * @method getData(request,response,next)
 * it will be used as a middleware it have the logic of retrive data
 */
export default class RedisMiddlware extends RedisServices {

    getData = (req, res, next) => {
        this.redisClient.on("error", () => {
            return next()
        })
        
            let key;
            switch (req.body.type.toLowerCase()) {
                case "users":
                    key = req.body.text + "_" + "users";
                    break;
                case "repos":
                    key = req.body.text + "_" + "repos";
                    break;
                case "issues":
                    key = req.body.text + "_" + "issues";
                    break;
                default:
                    break;
            }

            this.getByKey(key).then(data => {
                if(!data){
                    return next()
                }
                data = JSON.parse(data);
                return res.status(200).json(data);
            }).catch(e => {
                return next()
            })
    }
}
