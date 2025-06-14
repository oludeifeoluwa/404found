const CustomError = require("../errors");
const { isTokenValid } = require("../utils/index");
const AgentToken = require("../models/AgentToken");
const { attachCookiesToResponse } = require("../utils");

const authenticateAgent = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.agent;
      return next();
    }
    const payload = isTokenValid(refreshToken);
    const existingToken = await AgentToken.findOne({
      agent: payload.agent.agentId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new CustomError.UnauthenticatedError("Authentication invalid");
    }
    attachCookiesToResponse({
      res,
      payload: { agent: payload.agent },
      refreshToken: existingToken.refreshToken,
    });
    req.user = payload.agent;
    return next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
};

module.exports = {
  authenticateAgent,
};
