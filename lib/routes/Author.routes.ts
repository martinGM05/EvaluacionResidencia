import { Router } from "express";
import AuthorController from "../controllers/AuthorController";

const authorRouter = Router();

authorRouter.get("/:id/activities", AuthorController.getActivities);

export default authorRouter;