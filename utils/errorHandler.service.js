const createHttpError = require('http-errors')

const HandleErrors = (err, req, res, next) => {
    const statusCode = createHttpError.InternalServerError || 500

    return res.status(statusCode).json({
        status: statusCode,
        success: false,
        error: {
            message: err.message || "Internal Server Error",
        },
        data: null
    })
}

module.exports = {
    HandleErrors
}