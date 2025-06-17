const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');
const createTokenUser = require('./createTokenUser');
const createTokenAgent= require('./createTokenAgent')
const checkPermissions = require('./checkPermissions');
const sendVerificationEmail = require('./sendVerificationEmail')
const sendResetPasswordEmail = require('./sendResetPasswordEmail')
const createHash = require('./createHash')

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  createTokenAgent,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash
};
