const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  let userCheck = await UserModel.findOne({ email });
  if (userCheck) {
    return res.send({ message: "User Already Exist" });
  }
  try {
    bcrypt.hash(password, 3, async (err, encrypted) => {
      if (err) {
        res.send({ message: "Something went wrong while registering" });
      } else {
        const user = new UserModel({
          email,
          password: encrypted,
        });
        await user.save();
        res.send({ message: "User registered" });
      }
    });
  } catch (error) {
    res.send({ message: "Something went wrong while registering" });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    const hashed = user?.password;
    bcrypt.compare(password, hashed, (err, result) => {
      if (err) {
        res.send({ message: "Something went wrong while login" });
      } else if (result) {
        const token = jwt.sign({ userID: user._id }, "coder");
        res.send({ message: "Logged in Successfully", token });
      }
    });
  } catch (error) {
    res.send({ message: "Something went wrong while login" });
  }
});
module.exports = { userRouter };
