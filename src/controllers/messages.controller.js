import service from '../services/messages.service.js'

async function encryptHandler(req, res) {
    try {
        const { message, cipherType, username, } = req.body;
        const response = await service.encryptService(username, cipherType, message);

        
        if (!response) {
            return res.status(422).json({
                message: "Inbound encryption failed."
            })
        }

        res.status(201).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            message: "Internal server Error"
        })
    }
}


async function decryptHandler(req, res) {
    try {
        if (!req.body) {
            return res.status(400).json({
                message: "Body is required in request."
            })
        }

        const { messageId } = req.body;

        if (!messageId) {
            return res.status(400).json({
                message: "messageId is required in request body."
            })
        }

        if (typeof messageId != 'number') {
            return res.status(400).json({
                message: "messageId must be a number"
            })
        }

        const response = await service.decryptService(messageId);

        if (!response) {
            return res.status(422).json({
                message: "Message decryption failed."
            })
        }

        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            message: "Internal server Error"
        })
    }
}

export default {
    encryptHandler,
    decryptHandler
}