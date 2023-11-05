import { generateSlug } from "../../helpers/slugGenarator.js";
import { Book } from "../../models/Book.js";
import createError from "http-errors";
export const createBook = async (req, res) => {
    try {
        if (!req.body.title || !req.body.writer) {
            res.status(200).json({
                error: "Book Writer and Title are required",
            });
        }
        const slug = generateSlug(req.body.title);
        const data = await Book.create({ ...req.body, slug });
        res.status(200).json({
            message: "Book created successfully",
            data,
        });
    } catch (err) {
        createError(500, err.message);
    }
};
export const getAllBook = async (req, res) => {
    try {
        const data = await Book.find().populate("writer");
        if (data.length > 0) {
            return res.status(200).json({
                message: `${data.length} Books found`,
                dataCount: data.length,
                data,
            });
        } else {
            return res.status(404).json({
                message: `${data.length} Books found`,
                dataCount: data.length,
                data: null,
            });
        }
    } catch (err) {
        throw createError(500, err.message);
    }
};
