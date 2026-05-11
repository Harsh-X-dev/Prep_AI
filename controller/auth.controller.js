import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/User.model.js";
import blacklistTokenModel from "../models/blacklist.model.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, process.env.JWT_EXPIRES);
};

export const registerUserController = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    res.status(400).json({
      message: "please provide username, eamil and password",
    });
  }

  const isUserAlreadyExist = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    res.status(400).json({
      message: "Account already exists with this username or emailAddress ",
    });
  }

  const hash = await bcrypt.hash(password, 12);

  const user = await UserModel.create({
    username,
    email,
    password: hash,
  });

  const token = signToken(user._id);

  res.cookie("token", token);

  res.status(201).json({
    message: "User registerd successfully",
    user,
  });
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: " please provide email and password. ",
    });
  }

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({
      message:
        "cant find user with these creadentials invalid email or password.",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message:
        "cant find user with these creadentials invalid email or password.",
    });
  }

  const token = signToken(user._id);

  res.cookie("token", token);

  res.status(201).json({
    message: "User logged IN successfully",
    user,
  });
};

export const logoutUserController = async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    await blacklistTokenModel.create({ token });
  }

  res.clearCookie("token");

  res.status(201).json({
    message: "User logged out successfully",
  });
};

export const getMeController = async (req, res) => {
  const user = await UserModel.findById(req.user.id);
  res.status(200).json({
    message: "found user details",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};
