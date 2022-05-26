const catchAsyncErrors = require('./CatchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const jwt = require('jsonwebtoken');

module.exports = catchAsyncErrors(async (req, res, next) => {
  /**
   * Get access token from the incoming request header
   * Format: Authorization: Bearer <token>
   */
  const AuthorizationHeader = req.headers['authorization'];
  if (!AuthorizationHeader) {
    return next(
      new ErrorHandler('Please login again to access this resource', 401)
    );
  }
  const token = AuthorizationHeader.split(' ')[1];
  if (!token) {
    return next(
      new ErrorHandler('Please login again to access this resource', 401)
    );
  }
  await jwt.verify(token, process.env.JWT_SECRET);
  next();
});
