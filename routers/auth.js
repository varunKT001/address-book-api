const router = require('express').Router();
const authController = require('../controllers/auth');

router
  .route('/get-jwt')
  /**
   * @route   GET /api/auth/get-jwt
   */
  .get(authController.getJwt);

module.exports = router;
