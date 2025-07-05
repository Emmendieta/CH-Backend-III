const errorHandler = (error, req, res, next) => {
    console.error(error); /* ------ MODIFICAR ESTO CON WINSTON ------- */
    const message = error.message || "Server Error!";
    const data = {
        method: req.method,
        url: req.originalUrl,
        error: { message }
    };
    res.status(error.statusCode || 500).json(data);
};

export default errorHandler;