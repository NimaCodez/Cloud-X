const { StatusCodes } = require('http-status-codes');

const NotFoundError = (req, res, next) => {
    return res.status(StatusCodes.NOT_FOUND).json({
        status: StatusCodes.NOT_FOUND,
        error: {
            type: 'Not Found',
            message: `Cannot Find ${req.url} path on the server.`
        }
    })
}

module.exports = {
    NotFoundError
}
