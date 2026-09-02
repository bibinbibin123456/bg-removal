import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRouter.js";
import imageRouter from "./routes/imageRouter.js";

// App config
const PORT = process.env.PORT || 4000;

const app = express();

// Connect database
await connectDB();

// Allowed frontend URLs
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "https://bg-removal-frontend-liart.vercel.app",
];

// CORS
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin
      if (!origin) {
        return callback(null, true);
      }

      // Allow known frontend URLs
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Api Working");
});

// API routes
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});