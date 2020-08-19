import GithubController from "../controllers/github.controller"
import RedisMiddleware  from "../middlewares/redis.middleware";
import validate from "../middlewares/validate.middleware";
import express from 'express';
const controller = new GithubController();
const redisMiddleware = new RedisMiddleware();
const router = express.Router();

router.post('/search',validate, redisMiddleware.getData, controller.search);

export default router;