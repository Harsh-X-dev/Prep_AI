import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.model.js";
import blacklistTokenModel from "../models/blacklist.model.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const cookieOptions = {
  httpOnly: true,
  secure: true, // Required on HTTPS (Render/Vercel)
  sameSite: "none", // Required for cross-site cookies
};

export const registerUserController = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({
      message: "Please provide username, email and password",
    });
  }

  const isUserAlreadyExist = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "Account already exists with this username or email",
    });
  }

  const hash = await bcrypt.hash(password, 12);

  const user = await UserModel.create({
    username,
    email,
    password: hash,
  });

  const token = signToken(user._id);

  res.cookie("token", token, cookieOptions);

  return res.status(201).json({
    message: "User registered successfully",
    user,
  });
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = signToken(user._id);

  res.cookie("token", token, cookieOptions);

  return res.status(200).json({
    message: "User logged in successfully",
    user,
  });
};

export const logoutUserController = async (req, res) => {
  const token = req.cookies?.token;

  if (token) {
    await blacklistTokenModel.create({ token });
  }

  res.clearCookie("token", cookieOptions);

  return res.status(200).json({
    message: "User logged out successfully",
  });
};

export const getMeController = async (req, res) => {
  const user = await UserModel.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    message: "Found user details",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};
