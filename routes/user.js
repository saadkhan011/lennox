require('dotenv').config();
const express = require("express");
const User = require("../models/user.js");
const Admin = require("../models/admin.js");
const auth = require("../middleware/auth.js");
const jwt = require("jsonwebtoken");
// const bcryptjs = require("bcryptjs");

const userRouter = express.Router();
const secretkey = process.env.SECRET_KEY;

userRouter.get("/", async function (req, res) {
  try {
    const result = await User.find();
    res.status(200).json(result);
    return;
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
});
userRouter.get("/:id", async function (req, res) {
  try {
    const id = req?.params?.id;
    const result = await User.findOne({ _id: id });
    res.status(200).json(result);
    return;
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
});

userRouter.post("/", auth, async function (req, res) {
  const data = req.body;
  console.log(data);
  try {
    if (!data?.name || !data?.email || !data?.lastname || !data?.amount || !data?.gender || !data?.password || !data?.company) {
      res.status(200).json({ message: "Name, Email, Phone and Company fields are required" });
      return;
    }
    const resultdata = await User.findOne({ email: req.body.email });
    if (resultdata) {
      res.status(200).json({ message: "User already exists" })
      return;
    };
    const result = await User.create(data);
    if (result) {
      res.status(200).json({ message: "Success!" });
      return;
    } else {
      res.status(200).send({ message: "Error occured!" });
      return;
    }
  } catch (error) {
    res.status(200).json({ message: "Error" });
    return;
  }
});

userRouter.post("/login", async function (req, res) {
  let data = req.body;
  console.log(data);
  try {
    if (!data.email || !data.password) return res.status(200).json({ message: "Email or password is required" });
    const newUser = await Admin.findOne({ email: data.email });

    if (!newUser) return res.status(200).json({ message: "Email or password is incorrect" });
    // const isPasswordCorrect = await bcryptjs.compare(data.password, newUser.password);
    // const isPasswordCorrect = await bcryptjs.compare(data.password, newUser.password);
    if (data.password != newUser.password) return res.status(200).json({ message: "Email or password is incorrect" });

    const token = jwt.sign({ user_id: newUser._id, email: newUser.email }, secretkey);

    res.status(200).json({ message: newUser, token });
  } catch (error) {
    res.status(200).json({ message: "error occured"+error.message });
  }
});
userRouter.post("/userlogin", async function (req, res) {
  let data = req.body;
  console.log(data);
  try {
    if (!data.email || !data.password) return res.status(200).json({ message: "Email or password is required" });
    const newUser = await User.findOne({ email: data.email });

    if (!newUser) return res.status(200).json({ message: "Email or password is incorrect" });
    if (data?.password != newUser.password) return res.status(200).json({ message: "Email or password is incorrect" });

    res.status(200).json({ message: newUser, token: "success" });
  } catch (error) {
    res.status(200).json({ message: "error occured" });
  }
});

userRouter.delete("/:id", auth, async function (req, res) {
  const id = req?.params?.id;
  try {
    const result = await User.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Success!" });
      return;
    } else {
      res.status(200).json({ message: "Error occured!" });
      return;
    }
  } catch (error) {
    res.status(200).json({ message: error.message });
    return;
  }
});

userRouter.patch("/:id", auth, async function (req, res) {
  const id = req.params.id;
  const data = req.body;
  try {
    if (!data?.name || !data?.email || !data?.lastname || !data?.amount || !data?.gender || !data?.password || !data?.company) {
      res.status(200).json({ message: "Name, Email, Phone and Company fields are required" });
      return;
    }
    const result = await User.findByIdAndUpdate(id, data);
    if (result) {
      res.status(200).json({ message: "Success!" });
      return;
    } else {
      res.status(200).json({ message: "Error occured!" });
      return;
    }
  } catch (error) {
    res.status(200).json({ message: error.message });
    return;
  }
});



module.exports = userRouter;
