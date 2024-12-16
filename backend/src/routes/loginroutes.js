import express from "express"
import { createUser } from "../controllers/createUser.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router=express.Router();

router.post("/register",createUser);
// router.post("/login",authMiddleware,login); for accessing the right products
export default router;