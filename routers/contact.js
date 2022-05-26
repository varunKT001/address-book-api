const router = require('express').Router();
const contactController = require('../controllers/contact');
const AuthMiddleware = require('../middlewares/auth');

router
  .route('/id/:id')
  /**
   * @route   GET /api/contact/id
   * @query   { id }
   */
  .get(AuthMiddleware, contactController.getSingleContact);

router
  .route('/query')
  /**
   * @route   GET /api/contact/query
   * @query   { name, address, contact }
   */
  .get(AuthMiddleware, contactController.getContactByQuery);

router
  .route('/')
  /**
   * @route   GET /api/contact
   * @query   { page, limit }
   */
  .get(AuthMiddleware, contactController.getContactByPageNumberAndLimit)
  /**
   * @route   PATCH /api/contact
   * @query   { id }
   */
  .patch(AuthMiddleware, contactController.updateExistingContact)
  /**
   * @route   GET /api/contact
   * @query   { id }
   */
  .delete(AuthMiddleware, contactController.deleteExistingContact);

router
  .route('/new/single-contact')
  /**
   * @route   POST /api/contact/new/single-contact
   * @body    { name, address, contact }
   */
  .post(AuthMiddleware, contactController.addSingleContact);

router
  .route('/new/bulk-contacts')
  /**
   * @route   POST /api/contact/new/single-contact
   * @body    [ { name, address, contact } ]
   */
  .post(AuthMiddleware, contactController.addBulkContacts);

module.exports = router;
