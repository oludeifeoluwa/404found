const CustomError = require('../errors');
const {isTokenValid} = require('../utils/index')
const Token = require('../models/UserToken');
const { attachCookiesToResponse } = require('../utils');

const authenticateUser = async (req, res, next) => {
    const { accessToken, refreshToken } = req.signedCookies;
    try {
      if(accessToken){
          const payload =  isTokenValid(accessToken);
          req.user = payload.user;
          return next()
      }
      const payload = isTokenValid(refreshToken)
      const existingToken = await Token.findOne({
          user : payload.user.userId,
          refreshToken : payload.refreshToken
      })
  
      if(!existingToken || !existingToken?.isValid){
          throw new CustomError.UnauthenticatedError('Authentication invalid')
      }
      attachCookiesToResponse({
          res,
          payload: {user : payload.user},
          refreshToken: existingToken.refreshToken
      })
      req.use = payload.user;
      next()
  } catch (error) {
      throw new CustomError.UnauthenticatedError('Authentication invalid')
  }
  };
  
const authorizePermissions = (...roles)=>{
   return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        throw new CustomError.UnauthorizedError("Access Denied")
    }
    next()
   }
}
module.exports = {
    authenticateUser,
    authorizePermissions
}