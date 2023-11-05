import createError from "http-errors";
import { Writer } from "../../models/Writer.js";
import { generateSlug } from "../../helpers/slugGenarator.js";
import { User } from "../../models/User.js";

//create new writer
export const createWriter = async (req, res) => {
    try {
        if (!req.body.name) {
            throw createError(500, "Writer name must be provided");
        }
        let slug = generateSlug(req.body.name);

        // const data = await Writer.create({ ...req.body, slug });
        const data = new Writer({ ...req.body, slug });
        await data.save();
        res.status(200).json({
            message: "Writer created successfully",
            data,
        });
    } catch (err) {
        throw createError(500, err.message);
    }
};

//get all writer
export const getAllWriter = async (req, res) => {
    try {
        const data = await Writer.find().populate("books");
        if (data.length > 0) {
            return res.status(200).json({
                message: `${data.length} writers found`,
                dataCount: data.length,
                data,
            });
        } else {
            return res.status(404).json({
                message: `${data.length} writers found`,
                dataCount: data.length,
                data: null,
            });
        }
    } catch (err) {
        throw createError(500, err.message);
    }
};

//get single writer
export const getSingleWriterBySlug = async (req, res) => {
    try {
        const data = await Writer.findOne({ slug: req.params.slug }).populate("books");
        if (!data) {
            res.status(404).json({
                message: "Writer not found",
            });
        } else {
            res.status(200).json({
                message: "Writer found successfully",
                data,
            });
        }
    } catch (err) {
        throw createError(500, err.message);
    }
};

//get all active writer
export const getAllActiveWriter = async (req, res) => {
    try {
        const data = await Writer.isActive();
        if (data.length > 0) {
            return res.status(200).json({
                message: `${data.length} writers found`,
                dataCount: data.length,
                data,
            });
        } else {
            return res.status(404).json({
                message: `${data.length} writers found`,
                dataCount: data.length,
                data: null,
            });
        }
    } catch (err) {
        throw createError(500, err.message);
    }
};

//get all trashed writers
export const getAllTrashedWriters = async (req, res) => {
    try {
        const data = await Writer.isTrashed();
        if (data.length > 0) {
            return res.status(200).json({
                message: `${data.length} writers found`,
                dataCount: data.length,
                data,
            });
        } else {
            return res.status(404).json({
                message: `${data.length} writers found`,
                dataCount: data.length,
                data: null,
            });
        }
    } catch (err) {
        throw createError(500, err.message);
    }
};

export const addBookToWriter = async (req, res) => {
    const data = await Writer.findById(req.params.id);
    console.log(data);
    await res.status(200).json({
        message: "Updated Successfully",
    });
};
