import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRouter.js";
import imageRouter from "./routes/imageRouter.js";

// App config
const PORT = process.env.PORT || 4000;
const app = express();

await connectDB();

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://bg-removal-frontend-liart.vercel.app",
];

// Check whether origin is allowed
const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  // Exact origins
  if (allowedOrigins.includes(origin)) {
    return true;
  }

  // Environment variable
  const configuredOrigin = process.env.FRONTEND_URL;

  if (configuredOrigin && origin === configuredOrigin) {
    return true;
  }

  // Allow Vercel frontend deployments
  const vercelPattern =
    /^https:\/\/bg-removal-frontend.*\.vercel\.app$/i;

  if (vercelPattern.test(origin)) {
    return true;
  }

  return false;
};

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "token",
  ],
};

// Middleware
app.use(express.json());

app.use(cors(corsOptions));

// Explicit preflight handling for Express 5
app.options(/.*/, (req, res) => {
  const origin = req.headers.origin;

  if (origin && isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    req.headers["access-control-request-headers"] ||
      "Content-Type, Authorization, X-Requested-With, token"
  );

  res.setHeader("Access-Control-Allow-Credentials", "true");
  return res.sendStatus(204);
});

// Request logging
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} ${req.method} ${req.originalUrl} Origin:${req.headers.origin}`
  );

  next();
});

// API routes
app.get("/", (req, res) => {
  res.send("Api Working");
});

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});