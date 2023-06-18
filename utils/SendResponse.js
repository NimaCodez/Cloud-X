const SendResponse = (res, statusCode, success, msg) => {
    return res.status(statusCode).json({
        status: statusCode,
        success,
        data: msg
    })
}

module.exports = { SendResponse }
