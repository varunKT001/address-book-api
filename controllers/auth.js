const jwt = require('jsonwebtoken');
const CatchAsyncErrors = require('../middlewares/CatchAsyncErrors');

/**
 * @desc    Get JWT token
 * @route   GET /api/auth/get-jwt
 * @access  Unprotected
 */
exports.getJwt = CatchAsyncErrors(async (req, res, next) => {
  const token = await jwt.sign({ success: true }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return res.status(200).json({
    success: true,
    data: { token },
  });
});
