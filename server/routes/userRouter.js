import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getUserCredits,
  paymentRazorpay,
  verifyRazorpay,
  createRazorpayOrder,
  verifyPayment,
} from "../controllers/userController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// Public Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Protected Routes
userRouter.get("/profile", authMiddleware, getUserProfile);
userRouter.get("/credits", authMiddleware, getUserCredits);
userRouter.post("/pay-razor", authMiddleware, paymentRazorpay);
userRouter.post("/create-order", authMiddleware, createRazorpayOrder);
userRouter.post("/verify-razor", verifyRazorpay);
userRouter.post("/verify-payment", verifyPayment);

export default userRouter;