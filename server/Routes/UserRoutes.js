import express from "express";
import asyncHandler from "express-async-handler";
import {protect, admin} from "../Middleware/AuthMiddleware.js";
import generateToken from "../utils/generateToken.js";
import User from "./../Models/UserModel.js";
import nodemailer from "nodemailer";
import fetch from "node-fetch";

const userRouter = express.Router();

// LOGIN
userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
        avatar: user.avatar
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password!");
    }
  })
);

// REGISTER
userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const {name, email, password, avatar} = req.body;

    const userExists = await User.findOne({email});

    if (userExists) {
      res.status(400);
      throw new Error("User already exists!");
    }

    let image = avatar;
    //lấy hình random
    //khi không được gửi lên hình
    await fetch("https://picsum.photos/300/300.jpg").then(value => {
      image = value.url;
    });
    console.log(image);

    const user = await User.create({
      name,
      email,
      password,
      avatar: image
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        avatar:user.avatar,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data!");
    }
  })
);

// PROFILE
userRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found!");
    }
  })
);

// UPDATE PROFILE
userRouter.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found!");
    }
  })
);

// GET ALL USER ADMIN
userRouter.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

userRouter.post("/forgot-password", asyncHandler(async (req, res) => {
  const email = req.body.email
  const users = await User.find({email: email});

  if (users) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nqkkt15082002@gmail.com',
        pass: 'dazkhrjgiznjxfvp'
      }
    });

    let mailOptions = {
      from: 'KN Clothing',
      to: users[0].email,
      subject: 'Change Password',
      text: `http://localhost:3000/rest-pass/${users[0]._id}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json("Success");
      }
    });

  } else {
    return res.status(400).json("Error");
  }
}))

userRouter.put("/change-password", asyncHandler(async (req, res) => {
  const {id, password} = req.body;

  const us = await User.findById(id);
  if (us) {
    us.password = password || us.password;

    const updatedProduct = await us.save();
    res.status(200).json(updatedProduct);
  }

}))

userRouter.delete("/delete_user", asyncHandler(async (req, res) => {
  const {id} = req.query;
  if (!id) {
    res.json({
      status: 404,
      message: "User's id is not found",
    });
  }

  User.findByIdAndDelete(id).then(value => {
    res.json({
      status: 200,
      message: "Deleted that user"
    })
  }).catch(reason => {
    res.json({
      status: 404,
      message: reason,
    });
  });
}))

export default userRouter;
