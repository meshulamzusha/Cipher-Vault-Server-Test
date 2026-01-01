import express from 'express';
import validator from '../middlewares/validator.js'
import controller from '../controllers/users.controller.js'

const router = express.Router();

router.post('/auth/register', 
    validator.validateUserFields, 
    controller.registerUser
)

export default router;