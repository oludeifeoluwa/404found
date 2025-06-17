const CustomError = require('../errors');

const checkAgentPermissions = (requestAgent, resourceAgentId) => {
  if (String(requestAgent.agentId) === String(resourceAgentId)) return;
  throw new CustomError.UnauthorizedError(
    'Not authorized to access this route'
  );
};

module.exports = checkAgentPermissions;
