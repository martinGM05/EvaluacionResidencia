import { Router } from "express";
import CommentsController from "../controllers/CommentsController";

const commentsRouter = Router();

commentsRouter.post("/", CommentsController.createComment);

export default commentsRouter;