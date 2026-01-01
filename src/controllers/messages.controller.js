import service from '../services/messages.service.js'

async function decryptHandler(req, res) {
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

export default {
    decryptHandler
}