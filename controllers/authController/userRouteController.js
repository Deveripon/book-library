import { User } from "../../models/User.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

export const createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ ...req.body, password: hashedPassword });
        await user.save();
        res.status(201).json({
            message: "User saved successfully",
            data: user,
        });
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
};
export const getAllUsers = async (req, res) => {
    try {
        const data = await User.find();
        if (data.length > 0) {
            res.status(200).json({
                message: `${data.length} Users found`,
                dataCount: data.length,
                data,
            });
        } else {
            res.status(404).json({
                message: `User not found`,
                dataCount: data.length,
                data,
            });
        }
    } catch (err) {
        res.status(err.status || 500).json({
            error: err.message,
        });
    }
};
export const getSingleUser = asyncHandler(async (req, res) => {
    try {
        const data = await User.findOne({ _id: req.params.id });

        if (!data) {
            return res.status(404).json({
                message: "No user found",
            });
        }

        res.status(200).json({
            message: "User found successfully",
            data,
        });
    } catch (err) {
        throw err;
    }
});
