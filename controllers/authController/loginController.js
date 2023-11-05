import { User } from "../../models/User.js";
import createError from "http-errors";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const userLogin = asyncHandler(async (req, res) => {
    const data = await User.findOne({ email: req.body.email });
    if (data) {
        const checkPassword = await bcrypt.compare(req.body.password, data.password);
        if (checkPassword) {
            const token = await jwt.sign(
                { id: data._id, email: data.email },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            req.headers.authorization = `Bearer ${token}`;
            res.cookie("access_token", token, {
                httpOnly: true,
                sameSite: "strict",
                path: "/",
                maxAge: 3600000,
                secure: process.env.NODE_ENV === "development" ? false : true,
            });
            res.status(200).json({
                message: "You are now logged in",
                data,
                header: req.headers.authorization,
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
});
