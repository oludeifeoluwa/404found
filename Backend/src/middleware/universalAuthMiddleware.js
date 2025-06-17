const CustomError = require("../errors");
const { isTokenValid } = require("../utils");
const AgentToken = require("../models/AgentToken");
const UserToken = require("../models/UserToken");
const { attachCookiesToResponse } = require("../utils");

const authenticate = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      const data = payload.user || payload.agent;

      req.user = {
        id: data.userId || data.agentId,
        role: data.role,
      };
      return next();
    }
    // No accessToken, check refreshToken
    const payload = isTokenValid(refreshToken);
    const data = payload.user || payload.agent;
    const isAgent = !!payload.agent;

    const tokenModel = isAgent ? AgentToken : UserToken;

    const existingToken = await tokenModel.findOne({
      [isAgent ? "agent" : "user"]: data.userId || data.agentId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken.isValid) {
      throw new CustomError.UnauthenticatedError("Authentication invalid");
    }
    attachCookiesToResponse({
      res,
      payload: isAgent ? { agent: data } : { user: data },
      refreshToken: existingToken.refreshToken,
    });

    req.user = {
      id: data.userId || data.agentId,
      role: data.role,
    };
    return next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError("Access Denied");
    }
    next();
  };
};

module.exports = { authenticate, authorizePermissions };
