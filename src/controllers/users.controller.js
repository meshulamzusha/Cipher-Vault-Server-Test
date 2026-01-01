import service from '../services/users.service.js'

async function registerUser(req, res) {
    try {
        const { username, password } = req.body;

        const user = await service.registerUserService(username, password);

        if (!user) {
            return res.status(409).json({
                message: `User with username ${username} already exist.`
            })
        }

        res.status(201).json(user)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export default {
        registerUser
    }


