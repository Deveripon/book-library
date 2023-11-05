import express from "express";
import {
    createUser,
    getAllUsers,
    getSingleUser,
} from "../../controllers/authController/userRouteController.js";
import { validateUserForm } from "../../middlewares/user/userAddFormValidator.js";
import { isAuthorized } from "../../middlewares/authorization/authorization.js";

const userRouter = express.Router();
userRouter.route("/create").post(validateUserForm, createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", isAuthorized, getSingleUser);

export default userRouter;
