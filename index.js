const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello!" });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});