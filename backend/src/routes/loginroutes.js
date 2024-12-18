import express from "express"
import { createUser } from "../controllers/createUser.js";
import authMiddleware from "../middlewares/authMiddleware.js"; 
import { userController } from "../controllers/userController.js";

const router=express.Router();

router.post("/register",createUser);
router.get("/getUserDetails", authMiddleware, userController);
// router.post("/login",authMiddleware,login); for accessing the right products
export default router;