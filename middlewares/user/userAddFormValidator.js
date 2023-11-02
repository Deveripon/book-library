import check, { query, validationResult } from "express-validator";

export const schemaValidator = [
    query("name", "name field is required")
        .isAlpha()
        .withMessage("No special character is allowed"),
    query("email", "email field is required")
        .isEmail()
        .withMessage("invalid email address")
        .toLowerCase(),
    query("password", "password field is required"),
    query("username", "username field is required"),
];

export const getValidationResult = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    } else {
        next(result);
    }
};
