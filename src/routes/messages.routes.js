import express from 'express';
import validator from '../middlewares/validator.js';
import auth from '../middlewares/auth.js';
import controller from '../controllers/messages.controller.js';


const router = express.Router();

router.use(
    validator.validateUserFields, 
    validator.validateEncryptBody, 
    auth.authenticateUser
);

router.post('/encrypt', controller.decryptHandler);

export default router
