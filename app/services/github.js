import axios from 'axios';
import redisServices from './redis';
const redisObject = new redisServices();

export default class githubServices {
    //search for users
    static async getUsers(text) {
        try {
            let users = await axios.get(`${process.env.GITHUB_API_URL}/search/users?q=${text.trim()}`);
            const key = text.trim() + "_" + "users";
            redisObject.addWithTTL(key,7200,users.data)
            return users.data
        } catch (e) {
            throw e;
        }
    }

    //search for repository
    static async getRepos(text) {
        try {
            let repos = await axios.get(`${process.env.GITHUB_API_URL}/search/repositories?q=${text.trim()}`);
            const key = text.trim() + "_" + "repos";
            redisObject.addWithTTL(key,7200,repos.data)
            return repos.data
        } catch (e) {
            throw e;
        }
    }

    //search for issues
    static async getIssues(text) {
        try {
            let issues = await axios.get(`${process.env.GITHUB_API_URL}/search/repositories?q=${text.trim()}`);
            const key = text.trim() + "_" + "issues";
            redisObject.addWithTTL(key,7200,issues.data)
            return issues.data
        } catch (e) {
            throw e;
        }
    }

    async search(type,text) {
        try {
            
            switch (type) {
                case "users":
                   return await githubServices.getUsers(text);
                case "repos":
                    return await githubServices.getRepos(text);
                case "issues":
                    return await githubServices.getIssues(text);
                default:
                    throw new Error("Unhandled Type "+ type)
            }
        } catch (e) {
            throw e;
        }
    }
}