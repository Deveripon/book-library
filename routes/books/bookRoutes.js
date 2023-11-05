import express from "express";
import { createBook, getAllBook } from "../../controllers/books/bookRouteController.js";

const bookRouter = express.Router();
bookRouter.route("/create").post(createBook);
bookRouter.get("/", getAllBook);

export default bookRouter;
