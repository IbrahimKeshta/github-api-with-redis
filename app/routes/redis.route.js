import RedisController from "../controllers/redis.controller";
import express from 'express';
const controller = new RedisController();
const router = express.Router();

router.post('/clear-cache', controller.flushData);

export default router;