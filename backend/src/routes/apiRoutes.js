import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';
import { getApiKeys, generateNewApiKey } from '../controllers/User/ApiController.js';

const router = express.Router() 


router.get("/getApiKeys",authMiddleware, getApiKeys);
router.post('/generateNewApiKey',authMiddleware, generateNewApiKey);

export default router