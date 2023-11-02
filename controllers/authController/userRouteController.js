import { User } from "../../models/User.js";
import bcrypt from "bcrypt";

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
