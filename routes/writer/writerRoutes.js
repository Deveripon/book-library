import express from "express";
import {
    addBookToWriter,
    createWriter,
    getAllActiveWriter,
    getAllTrashedWriters,
    getAllWriter,
    getSingleWriterBySlug,
} from "../../controllers/writer/writerRouteController.js";

const writerRouter = express.Router();

writerRouter.route("/create").post(createWriter);
writerRouter.get("/", getAllWriter);
writerRouter.get("/:slug", getSingleWriterBySlug);
writerRouter.get("/active/writer", getAllActiveWriter);
writerRouter.get("/active/false", getAllTrashedWriters);
writerRouter.patch("/update/:id", addBookToWriter);

export default writerRouter;
