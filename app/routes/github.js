import githubController from "../controllers/github"
import express from 'express';
import redisMiddlware  from "../middlewares/redis";
import validate from "../middlewares/validate";
const controller = new githubController();
const redisMW = new redisMiddlware();
const router = express.Router();

router.post('/search',validate, redisMW.getData, controller.search);

export default router;