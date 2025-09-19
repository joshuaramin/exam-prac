import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./middleware/logger.mjs";
import { connectDB } from "./config/database.mjs";

dotenv.config();

// Routes
import UserRoute from "./routes/userRoute.mjs";
import PostRoute from "./routes/postRoute.mjs";
import UpvoteRoute from "./routes/upvoteRoute.mjs";
import AuthRoute from "./routes/authRoute.mjs";

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api/v1/users", UserRoute);
app.use("/api/v1/posts", PostRoute);
app.use("/api/v1/upvote", UpvoteRoute);
app.use("/auth", AuthRoute);

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection error", err);
    process.exit(1);
  });
