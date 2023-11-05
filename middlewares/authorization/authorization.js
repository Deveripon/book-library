import jwt from "jsonwebtoken";
export const isAuthorized = async (req, res, next) => {
    try {
        let token = req.cookies.access_token;
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        next();
    } catch {
        next("You are not authorized to access this page.");
    }
};
