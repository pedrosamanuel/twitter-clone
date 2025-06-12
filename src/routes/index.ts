import { Router } from "express";
import postRoute from "./post.route";
import likeRoute from "./like.route";
import authRoute from "./auth.route";

const router = Router();

router.use(postRoute);
router.use(likeRoute);
router.use('/auth',authRoute);

export default router;