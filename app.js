//IMPORT DEPENDENCIES
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import { __404ErrorHandler, __errorHandler } from "./middlewares/common/errorHandler.js";
import { connectToMongoDb } from "./config/mongodbConnection.js";
import userRouter from "./routes/authRoutes/userRouter.js";
import loginRouter from "./routes/authRoutes/loginRouter.js";
import cookieParser from "cookie-parser";
import writerRouter from "./routes/writer/writerRoutes.js";
import bookRouter from "./routes/books/bookRoutes.js";

dotenv.config();

//INTIALIZE EXPRESS APP
const app = express();
//set view engine
app.set("view engine", "ejs");
app.use(expressEjsLayouts);

//add support middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("public")));
app.use(cookieParser());
// add routes

app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/writer", writerRouter);
app.use("/books", bookRouter);
//add error handlers
app.use(__404ErrorHandler);
app.use(__errorHandler);

//run server

app.listen(process.env.PORT || 6060, () => {
    connectToMongoDb();
    console.log(` Server started at ${process.env.PORT} `.bgGreen);
});
