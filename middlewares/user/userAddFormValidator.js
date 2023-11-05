import { User } from "../../models/User.js";

export const validateUserForm = async (req, res, next) => {
    //validate required fields
    const { name, email, username, password } = req.body;
    if (!name) {
        next("Name Field is required");
    } else if (!email) {
        next("email Field is required");
    } else if (!username) {
        next("username Field is required");
    } else if (!password) {
        next("password Field is required");
    }

    //validate unique fields
    const userEmail = await User.findOne({ email: req.body.email });
    const userUsername = await User.findOne({ username: req.body.username });
    if (userEmail) {
        next("This email address is already in use");
    } else if (userUsername) {
        next("This Username has been taken");
    }
    next();
};
