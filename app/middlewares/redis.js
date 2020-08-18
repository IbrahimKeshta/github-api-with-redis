import redisServices from '../services/redis';

export default class redisMiddlware extends redisServices {

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