import jwt from "jsonwebtoken";
import blacklistTokenModel from "../models/blacklist.model.js";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token;
//   const token = req.cookies.token;


  if (!token) {
    res.status(401).json({
      message: "not logged in/ token not provided.",
    });
  }

  const isTokenBlacklisted = await blacklistTokenModel.findOne({ token });

  if (isTokenBlacklisted) {
    res.status(401).json({
      message: "token is not valid",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Invalid token.",
    });
  }
};
