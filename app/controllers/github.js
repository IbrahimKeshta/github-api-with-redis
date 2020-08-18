import githubServices from "../services/github";

export default class githubController extends githubServices {
    constructor(){
        super()
    }
    async search(req, res){
        try {
           let data = await super.search(req.body.type, req.body.text);
           return res.status(200).json(data);
        } catch (e) {
            console.log("error", e);
            return res.status(e.status || 400).json({message: "There's an error finding data", error: e.message})
        }
    }
}