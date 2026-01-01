function validateUserFields(req, res, next) {
    if (!req.body) {
        return res.status(400).json({
            message: "Body is required in request."
        })
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "username or password is missing in request body."
        })
    }

    if (typeof username != 'string') {
        return res.status(400).json({
            message: "Type of username must be string"
        })
    }

    if (typeof password != 'string') {
        return res.status(400).json({
            message: "Type of password must be string"
        })
    }

    next()
}


function validateEncryptBody(req, res, next) {
    const { message, cipherType } = req.body;

    if (!message || !cipherType) {
        return res.status(400).json({
            message: "Message text or cipherType is missing in request body."
        })
    }

    if (typeof message != 'string') {
        return res.status(400).json({
            message: "Type of message must be string"
        })
    }

    if (typeof cipherType != 'string') {
        return res.status(400).json({
            message: "Type of cipherType must be string"
        })
    }

    if (cipherType.toUpperCase() != 'REVERSE' && cipherType.toUpperCase() != 'ATBASH' && cipherType.toUpperCase() != 'RANDOM_SHUFFLE') {
        return res.status(400).json({
            message: "cipherType must be one of REVERSE, ATBASH, RANDOM_SHUFFLE"
        })
    }

    next()
}


export default {
    validateUserFields,
    validateEncryptBody
}