import { Router } from "express";
import UserController from '../controllers/UserControllers';

const userRouter = Router();

userRouter.get("/", UserController.getAllUsers);
userRouter.post("/", UserController.createUser);

export default userRouter;