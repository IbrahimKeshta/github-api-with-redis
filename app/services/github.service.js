import axios from 'axios';
import RedisServices from './redis.service';
const redisServices = new RedisServices();

/**
 * @class GithubServices
 * This class have the main logic of calling github api and store data
 * @method getUsers(text) - fetch users data from github search api
 * then fetch users profiles for the returned Users and store it in redis
 * 
 * @method getRepos(text) - fetch repositories from github search api and
 * store it in redis 
 * @method getIssues(text) - fetch issues from github search api and 
 * store it in redis
 * 
 * @method search(text) - a method will determine with method should be called [users,repos,issues]
 */
export default class GithubServices {
    constructor(){
        this._headers = {
            headers:{
                'Content-Type': 'application/json',
                Accept: 'application/vnd.github.v3.full+json',
                Authorization: process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : '',
            }
        }
    }
    //search for users
     async getUsers(text) {
        try {
            let users = await axios.get(`${process.env.GITHUB_API_URL}/search/users?q=${text.trim()}`,this._headers)
            users.data.items = await Promise.all(users.data.items.map(async element => {
                return (await axios.get(element.url,this._headers)).data
              
            }));
            const key = text.trim() + "_" + "users";
            redisServices.addWithTTL(key,7200,users.data)
            return users.data
        } catch (e) {
            throw e;
        }
    }

    //search for repository
    async getRepos(text) {
        try {
            let repos = await axios.get(`${process.env.GITHUB_API_URL}/search/repositories?q=${text.trim()}`,this._headers);
            const key = text.trim() + "_" + "repos";
            redisServices.addWithTTL(key,7200,repos.data)
            return repos.data
        } catch (e) {
            throw e;
        }
    }

    //search for issues
    async getIssues(text) {
        try {
            let issues = await axios.get(`${process.env.GITHUB_API_URL}/search/repositories?q=${text.trim()}`,this._headers);
            const key = text.trim() + "_" + "issues";
            redisServices.addWithTTL(key,7200,issues.data)
            return issues.data
        } catch (e) {
            throw e;
        }
    }
    async search (type,text) {
        try {
            switch (type) {
                case "users":
                   return await this.getUsers(text);
                case "repos":
                    return await this.getRepos(text);
                case "issues":
                    return await this.getIssues(text);
                default:
                    throw new Error("Unhandled Type "+ type)
            }
        } catch (e) {
            throw e;
        }
    }
}