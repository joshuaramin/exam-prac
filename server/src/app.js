const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { default: logger } = require("./middleware/logger");

dotenv.config();

//routes
const UserRoute = require("./routes/userRoute");
const PostRoute = require("./routes/postRoute");
const UpvoteRoute = require("./routes/upvoteRoute");

const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: ["*"],
  exposeHeaders: ["*"],
  maxAge: 86400,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);

app.options("*", cors(corsOptions));

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

const { connectDB } = require("./config/database");

connectDB()
  .then((dbInfo) => {
    console.log(`Connected to ${dbInfo.type} database`);

    app.listen(4000, (PORT) => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error", err);
    process.exit(1);
  });
