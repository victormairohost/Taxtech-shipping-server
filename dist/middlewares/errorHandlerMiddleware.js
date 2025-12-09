export const errorHandler = (err, 
// @ts-ignore
req, res, 
// @ts-ignore
next) => {
    const error = {
        statusCode: err.statusCode || 500,
        message: err.message || "Sorry something went wrong, please try again",
        status: "Error",
    };
    res
        .status(error.statusCode)
        .json({ error: error.status, message: error.message });
};
//# sourceMappingURL=errorHandlerMiddleware.js.map