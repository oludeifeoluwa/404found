const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Agent = require("../models/Agent");
const AgentToken = require("../models/AgentToken");

const {
  attachCookiesToResponse,
  createTokenAgent,
  sendVerificationEmail,
} = require("../utils");
const {
  registerValidator,
  loginValidator,
  verifyValidator,
} = require("../validator/authValidate");
const crypto = require("crypto");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const { error, value } = registerValidator(req.body);
  if (error) {
    console.log(error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: error.details.map((details) => details.message) });
  }
  const emailAlreadyExists = await Agent.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequest("Email already exists");
  }

  const verificationToken = crypto.randomBytes(40).toString("hex");
  const agent = await Agent.create({
    name,
    email,
    password,
    verificationToken,

  });
  const origin = "http://localhost:3000"; //incase a frontend is created make sure you match this with the name
  await sendVerificationEmail({
    name: agent.name,
    email: agent.email,
    verificationToken: agent.verificationToken,
    origin,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "check email to verify your account" });
};
const verifyEmail = async (req, res) => {
  const { error, value } = verifyValidator(req.body);
  if (error) {
    console.log(error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: error.details.map((details) => details.message) });
  }
  const { verificationToken, email } = value;

  const agent = await Agent.findOne({ email });
  if (!agent) {
    throw new CustomError.UnauthenticatedError("invalid credentials");
  }
  if (agent.verificationToken !== verificationToken) {
    throw new CustomError.UnauthenticatedError("invalid credentials");
  }
  if (agent.verificationTokenExpires < Date.now()) {
    throw new CustomError.UnauthenticatedError("Verification token expired");
  }

  agent.isVerified = true;
  agent.verified = Date.now();
  agent.verificationToken = undefined;
  await agent.save();

  res.status(StatusCodes.OK).json({ msg: "Email successfully Verified" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { error, value } = loginValidator(req.body);
  if (error) {
    console.log(error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: error.details.map((details) => details.message) });
  }
  const agent = await Agent.findOne({ email });
  if (!agent) {
    throw new CustomError.UnauthenticatedError("invalid credentials");
  }
  const isPasswordCorrect = await agent.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("invalid credentials");
  }
  if (!agent.isVerified) {
    throw new CustomError.UnauthenticatedError("Account not verified");
  }
  const tokenAgent = createTokenAgent(agent);

  let refreshToken = "";
  const existingToken = await AgentToken.findOne({ agent: agent._id });
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new CustomError.UnauthenticatedError("invalid credentials");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, payload:{agent: tokenAgent}, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenAgent });
    return;
  }
  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const tokenUserAgent = { refreshToken, userAgent, ip, agent: agent._id };
  await AgentToken.create(tokenUserAgent);

  attachCookiesToResponse({ res, payload :{agent: tokenAgent}, refreshToken });
  res.status(StatusCodes.OK).json({ user: tokenAgent });
};


const logout = async (req, res) => {
  await AgentToken.findOneAndDelete({ agent: req.user.userId });
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "Agent logged out" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError.BadRequest("must provide all the required vlues");
  }
  const agent = await Agent.findOne({ email });
  if (agent) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    const origin = "http://localhost:3000";

    await sendResetPasswordEmail({
      name: agent.name,
      email: agent.email,
      token: passwordToken,
      origin,
    });
    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
    agent.passwordToken = createHash(passwordToken);
    agent.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await agent.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "please check your email for reset password link" });
};

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    throw new CustomError.BadRequest("provide all the values");
  }
  const agent = await Agent.findOne({ email });
  if (agent) {
    const currentDate = new Date();
    if (
      agent.passwordToken === createHash(token) &&
      agent.passwordTokenExpirationDate > currentDate
    ) {
      agent.password = password;
      agent.passwordToken = null;
      agent.passwordTokenExpirationDate = null;
      await agent.save();
    }
  }
  res.status(StatusCodes.OK).json({ msg: "password successfully reset" });
};
module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
