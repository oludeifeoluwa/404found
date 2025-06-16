const Agent = require("../models/Agent");
const User = require("../models/User");
const AgentToken = require("../models/AgentToken");
const UserToken = require("../models/UserToken");
const crypto = require("crypto");
const CustomError = require("../errors");
const {
  createTokenAgent,
  createTokenUser,
  attachCookiesToResponse,
} = require("../utils");
const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!["agent", "user"].includes(role)) {
    return res.status(400).json({ msg: "Invalid role specified" });
  }

  const Model = role === "agent" ? Agent : User;
  const TokenModel = role === "agent" ? AgentToken : UserToken;
  const createToken = role === "agent" ? createTokenAgent : createTokenUser;

  const user = await Model.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }

  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError("Account not verified");
  }

  const tokenPayload = createToken(user);
  let refreshToken = "";
  const tokenQuery =
    role === "agent" ? { agent: user._id } : { user: user._id };

  const existingToken = await TokenModel.findOne({ tokenQuery });
  if (existingToken && existingToken.isValid) {
    refreshToken = existingToken.refreshToken;
  } else {
    refreshToken = crypto.randomBytes(40).toString("hex");

    await TokenModel.create({
      [role]: user._id,
      refreshToken,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });
  }

  attachCookiesToResponse({
    res,
    payload: { [role]: tokenPayload },
    refreshToken,
  });
  res.status(200).json({ user: tokenPayload, role });
};

//   const logout = async (req, res) => {
//     const { userId, role } = req.user;

//     if (role === "agent") {
//       await AgentToken.findOneAndDelete({ agent: userId });
//     } else if (role === "user") {
//       await UserToken.findOneAndDelete({ user: userId });
//     }

//     res.cookie("accessToken", "logout", {
//       httpOnly: true,
//       expires: new Date(Date.now()),
//     });

//     res.cookie("refreshToken", "logout", {
//       httpOnly: true,
//       expires: new Date(Date.now()),
//     });

//     res.status(StatusCodes.OK).json({ msg: `${role} logged out` });
//   };

module.exports = { login };
