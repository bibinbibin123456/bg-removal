import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRouter.js";
import imageRouter from "./routes/imageRouter.js";

// App config
const PORT = process.env.PORT || 4000;

const app = express();

// Middleware
app.use(express.json());

// CORS
app.use(
  cors({
    origin:"https://bg-removal-frontend-liart.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  })
);



// Test route
app.get("/", (req, res) => {
  res.status(200).send("Api Working");
});

// API routes
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

// Connect database
await connectDB();

// Export app for Vercel
export default app;

// Start server locally
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}