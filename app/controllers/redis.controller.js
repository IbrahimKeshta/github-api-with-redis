import GithubServices from "../services/github.service";
import RedisServices from "../services/redis.service";

/**
 * @class RedisController
 *  This class controller will extends from the Parent RedisServices
 * and use the super() methods and handle req, res to be used in the route
 * @method flushData(request,response)
 * this will call parent @method flushData(); to clear redis cache 
 */
export default class RedisController extends RedisServices {
    constructor(){
        super()
    }
    flushData = async (req, res) => {
        try {
           let data = await super.flushData();
           return res.status(200).json({status:data});
        } catch (e) {
            console.log("error", e);
            return res.status(e.status || 400).json({message: "There's an error deleting data from cache", error: e.message})
        }
    }
}