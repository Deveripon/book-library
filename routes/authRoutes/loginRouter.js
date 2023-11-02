import express from "express";
import { userLogin } from "../../controllers/authController/loginController.js";

const loginRouter = express.Router();

loginRouter.post("/", userLogin);

export default loginRouter;
