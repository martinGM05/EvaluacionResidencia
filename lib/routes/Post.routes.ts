import { Router } from "express";
import CommentsController from "../controllers/CommentsController";
import PostController from "../controllers/PostController";

const postRouter = Router();

postRouter.get("/", PostController.getAllPosts);
postRouter.post("/", PostController.createPost);
postRouter.get("/:id/comments", CommentsController.getCommentsById);


export default postRouter;