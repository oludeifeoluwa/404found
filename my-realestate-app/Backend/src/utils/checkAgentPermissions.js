const CustomError = require('../errors');

const checkAgentPermissions = (requestAgentId, resourceAgentId) => {
  if (!requestAgentId) {
    throw new CustomError.UnauthorizedError("Not authorized to access this route");
  }
  if (requestAgentId.toString() === resourceAgentId.toString()) return;
  throw new CustomError.UnauthorizedError(
    'Not authorized to access this route'
  );
};

module.exports = checkAgentPermissions;
