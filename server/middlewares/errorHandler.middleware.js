exports.errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    const status = err.status || 500;
    const message = err.message || "Some error occurred";
    const data = err.data || null;
    res.status(status).send({
        type: "error",
        message,
        data
    });
}