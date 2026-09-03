import UserModel from "../models/userModel.js";
import TransactionModel from "../models/transactionModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Razorpay from 'razorpay'
import crypto from 'crypto'

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check empty fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Check existing user
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate Token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        credits: user.credits,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    // Find User
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Generate Token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        credits: user.credits,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Credits
export const getUserCredits = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);

    res.status(200).json({
      success: true,
      credits: user.credits,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRazorpayKeys = () => {
  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return null;
  }

  const isPlaceholder = (value) =>
    value.includes('YOUR_LIVE_KEY_ID') ||
    value.includes('YOUR_LIVE_KEY_SECRET') ||
    value.includes('YOUR_TEST_KEY_ID') ||
    value.includes('YOUR_TEST_KEY_SECRET');

  if (isPlaceholder(RAZORPAY_KEY_ID) || isPlaceholder(RAZORPAY_KEY_SECRET)) {
    return null;
  }

  return {
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  };
};

const getRazorpayInstance = () => {
  const razorpayConfig = getRazorpayKeys();
  return razorpayConfig ? new Razorpay(razorpayConfig) : null;
};

export const paymentRazorpay = async (req, res) => {
  try {
    const razorpayInstance = getRazorpayInstance();

    if (!razorpayInstance) {
      return res.status(500).json({
        success: false,
        message:
          'Razorpay keys are not configured correctly. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in server/.env with your live or test credentials.',
      });
    }
    const userId = req.user.id; // JWT middleware should set this
    const { planId } = req.body;

    const userData = await UserModel.findById(userId);

    if (!userData || !planId) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    let credits, plan, amount;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 5;
        amount = 10;
        break;

      case "Pro":
        plan = "Pro";
        credits = 100;
        amount = 50;
        break;

      case "Premium":
        plan = "Premium";
        credits = 500;
        amount = 250;
        break;

      default:
        return res.json({
          success: false,
          message: "Invalid Plan",
        });
    }

    // If amount is zero (free plan), credit the user immediately without Razorpay
    const transaction = await TransactionModel.create({
      userId,
      plan,
      amount,
      credits,
      date: Date.now(),
      payment: amount === 0 ? true : false,
    });

    if (amount === 0) {
      // add credits to user immediately
      await UserModel.findByIdAndUpdate(userId, { $inc: { credits: credits } });

      return res.json({
        success: true,
        order: null,
        message: 'Free plan applied, credits added',
      });
    }

    const options = {
      amount: amount * 100, // Razorpay uses paise
      currency: process.env.CURRENCY,
      receipt: transaction._id.toString(),
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({
      success: true,
      order,
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const createRazorpayOrder = paymentRazorpay;

// API Controller fn to verify api payment
export const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing Razorpay payment details" });
    }

    const razorpayInstance = getRazorpayInstance();

    if (!razorpayInstance) {
      return res.status(500).json({
        success: false,
        message:
          'Razorpay keys are not configured correctly. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in server/.env with your live or test credentials.',
      });
    }

    const razorpayConfig = getRazorpayKeys();

    if (!razorpayConfig) {
      return res.status(500).json({
        success: false,
        message: 'Razorpay keys are not configured correctly. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in server/.env with your live or test credentials.',
      });
    }

    const generatedSignature = crypto
      .createHmac('sha256', razorpayConfig.key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Razorpay signature verification failed" });
    }

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status !== "paid") {
      return res.status(400).json({ success: false, message: "Order not paid" });
    }

    const receipt = orderInfo.receipt;
    const transactionData = await TransactionModel.findById(receipt);

    if (!transactionData) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    if (transactionData.payment) {
      return res.status(400).json({ success: false, message: "Payment already processed" });
    }

    const userData = await UserModel.findById(transactionData.userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const newCredits = (userData.credits || 0) + (transactionData.credits || 0);

    await UserModel.findByIdAndUpdate(userData._id, { credits: newCredits });
    await TransactionModel.findByIdAndUpdate(transactionData._id, { payment: true });

    return res.json({ success: true, message: "Credits added", credits: newCredits });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPayment = verifyRazorpay;

