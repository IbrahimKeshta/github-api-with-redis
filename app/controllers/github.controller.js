import GithubServices from "../services/github.service";

/**
 * @class GithubController
 * This class controller will extends from the Parent GithubServices
 * and use the super() methods and handle req, res to be used in the route
 * @method search(request,response)
 * this will call the parent @method search(type,text) to get search result
 */
export default class GithubController extends GithubServices {
    constructor(){
        super()
    }
    search = async (req, res) => {
        try {
           let data = await super.search(req.body.type, req.body.text);
           return res.status(200).json(data);
        } catch (e) {
            return res.status(e.status || 400).json({message: "There's an error finding data", error: e.message})
        }
    }
}