import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getUserCredits,
} from "../controllers/userController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// Public Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Protected Routes
userRouter.get("/profile", authMiddleware, getUserProfile);
userRouter.get("/credits", authMiddleware, getUserCredits);

export default userRouter;