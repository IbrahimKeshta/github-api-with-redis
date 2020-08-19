import express from 'express';
import githubRoutes from './github.route';
import redisRoutes from './redis.route';
const router = express.Router();

router.use(githubRoutes);
router.use(redisRoutes);

export default router;


