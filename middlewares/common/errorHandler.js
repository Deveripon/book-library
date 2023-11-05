import createError from "http-errors";
export const __404ErrorHandler = (req, res, next) => {
    next(createError(404, "Requested Url not found"));
};

export const __errorHandler = (err, req, res, next) => {
    if (err.message) {
        res.status(err.status || 500).send({
            error: err.message,
        });
    } else {
        res.status(err.status || 500).send({
            error: err,
        });
    }
};
