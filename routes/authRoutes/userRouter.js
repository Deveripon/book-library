import express from "express";
import { createUser } from "../../controllers/authController/userRouteController.js";

const userRouter = express.Router();
userRouter.route("/create").post(createUser);

export default userRouter;
