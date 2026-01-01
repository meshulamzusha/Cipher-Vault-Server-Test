import usersService from "../services/users.service.js";

async function authenticateUser(req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await usersService.getUserByUsername(username);

        if (!user) {
            return res.status(404).json({
                message: `user with ${username} not exist`
            })
        }
        
        if (user.password != password) {
            return res.status(401).json({
                message: "Username exists but password is incorrect."
            })
        }

        next()

    } catch (error) {
        return res.status(500).json({
            error: error.message,
            message: "Internal server Error"
        })
    }
}


export default {
    authenticateUser
}