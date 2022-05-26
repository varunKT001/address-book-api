const CatchAsyncErrors = require('../middlewares/CatchAsyncErrors');
const Contact = require('../models/Contact');
const ErrorHandler = require('../utils/ErrorHandler');

/**
 * @desc    Get single contact from Id
 * @route   GET /api/contact/id/:id
 * @access  Protected
 */
exports.getSingleContact = CatchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    return next(new ErrorHandler('Contact not found', 400));
  }
  return res.status(200).json({
    success: true,
    data: contact,
  });
});

/**
 * @desc    Get multiple contacts using by query parameters
 * @route   GET /api/contact/query
 * @access  Protected
 */
exports.getContactByQuery = CatchAsyncErrors(async (req, res, next) => {
  let query = req.query;

  /**
   * Contructing mongodb regex query
   * Regex query format: { Key: { $regex: regex_expression } }
   */
  for (const [key, value] of Object.entries(query)) {
    query[key] = { $regex: `.*${value}.*`, $options: 'i' };
  }

  const contact = await Contact.find(req.query);
  if (!contact || !contact.length) {
    return next(new ErrorHandler('Contact(s) not found', 400));
  }
  return res.status(200).json({
    success: true,
    data: contact,
  });
});

/**
 * @desc    Get paginated list of contacts
 * @route   GET /api/contact
 * @access  Protected
 */
exports.getContactByPageNumberAndLimit = CatchAsyncErrors(
  async (req, res, next) => {
    let { page, limit } = req.query;

    /**
     * Page ==> Greater that or equal to (>=) 1
     * Limit ==> Should not be equal to (!=) 0
     */
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }

    page = parseInt(page);
    limit = parseInt(limit);

    /**
     * Skip to the first record in the requested page
     * Steps:
     * 1. Move to previous page => (page - 1)
     * 2. Find the number of records in those number of pages => (page -1)*limit
     */
    const skipIndex = (page - 1) * limit;

    /**
     * Steps to paginate:
     * 1. Sort the records according to the name (alphabetical order)
     * 2. Skip to the requested page (ignoring previous records)
     * 3. Limit the number of records in the final result
     */
    const contacts = await Contact.find()
      .sort({ name: 1 })
      .skip(skipIndex)
      .limit(limit);

    return res.status(200).json({
      success: true,
      data: contacts,
    });
  }
);

/**
 * @desc    Update existing contact
 * @route   PATCH /api/contact
 * @access  Protected
 */
exports.updateExistingContact = CatchAsyncErrors(async (req, res, next) => {
  const { id } = req.query;
  const updatedContact = req.body;
  const contact = await Contact.findByIdAndUpdate(id, updatedContact, {
    new: true,
  });
  return res.status(200).json({
    success: true,
    data: contact,
  });
});

/**
 * @desc    Delete existing contact
 * @route   DELETE /api/contact
 * @access  Protected
 */
exports.deleteExistingContact = CatchAsyncErrors(async (req, res, next) => {
  const { id } = req.query;
  const contact = await Contact.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: 'Contact deleted',
  });
});

/**
 * @desc    Add single contact
 * @route   POST /api/contact/new/single-contact
 * @access  Protected
 */
exports.addSingleContact = CatchAsyncErrors(async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  return res.status(200).json({
    success: true,
    data: req.body,
  });
});

/**
 * @desc    Add bulk contacts
 * @route   POST /api/contact/new/bulk-contact
 * @access  Protected
 */
exports.addBulkContacts = CatchAsyncErrors(async (req, res, next) => {
  const newContacts = await Contact.insertMany(req.body);
  return res.status(200).json({
    success: true,
    data: req.body,
  });
});
