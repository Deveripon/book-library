import { json } from "express";
import { User } from "../../models/User.js";
import createError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
    try {
        const data = await User.findOne({ email: req.body.email });
        if (data) {
            const checkPassword = await bcrypt.compare(req.body.password, data.password);
            if (checkPassword) {
                const token = jwt.sign(
                    { id: data._id, email: data.email },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );
                res.cookie("access_token", data.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "development" ? "false" : true,
                    sameSite: "strict",
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                
                res.status(200).json({
                    message: "You are now logged in",
                    data,
                    token,
                });
            } else {
                res.status(203).json({
                    message: "Authentication failed",
                });
            }
        } else {
            res.status(203).json({
                message: "Authentication failed",
            });
        }
    } catch (err) {
        throw createError(err.message);
    }
};
