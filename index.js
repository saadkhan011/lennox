//jshint esversion:6
require('dotenv').config()
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user.js");
const mongoose = require("mongoose");

const port = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/user", userRouter);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
