const express = require("express");
const mongoose = require("mongoose");
const postRouter = require("./routes/post.route");
const authRouter = require("./routes/auth.route");
const redis = require("redis");
const session = require("express-session");
let redisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: process.env.REDIS_HOST || "redis",
  port: process.env.REDIS_PORT,
});

const app = express();
const port = process.env.PORT || 3000;

app.use(session({
  store: new redisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 30000,
  },
}));
app.use(express.json());

const MAX_RETRIES = 5; 
let retryCount = 0;

const connectWithRetry = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");
    startServer(); 
  } catch (err) {
    retryCount++;
    console.error(`MongoDB connection failed. Retry ${retryCount}/${MAX_RETRIES}`, err);

    if (retryCount >= MAX_RETRIES) {
      console.error("Maximum retries reached. Exiting...");
      process.exit(1); 
    } else {
      setTimeout(connectWithRetry, 5000); 
    }
  }
};

const startServer = () => {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
};

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello!" });
});

connectWithRetry();
