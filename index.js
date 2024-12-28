const express = require("express");
const mongoose = require("mongoose");
const postRouter = require("./routes/post.route");

const app = express();
const port = process.env.PORT || 3000;

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

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello!" });
});

connectWithRetry();
