const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = "mongodb://admin:admin@172.25.0.2:27017/?authSource=admin";

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello!" });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

