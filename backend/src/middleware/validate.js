const { body, param, query, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

const handleValidation = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  const errors = result.array().map((e) => ({ field: e.path, message: e.msg }));
  next(new AppError('Validation failed', 400, errors));
};

const idParam = param('id').isMongoId().withMessage('Invalid employee id');

// For updates every field is optional, but if present it must still be valid.
const employeeFields = (isUpdate) => {
  const required = (chain, msg) => (isUpdate ? chain.optional() : chain.exists({ checkFalsy: true }).withMessage(msg).bail());
  return [
    required(body('name').trim(), 'Employee name is required')
      .isLength({ min: 2, max: 80 }).withMessage('Name must be 2-80 characters'),
    required(body('email').trim(), 'Email is required')
      .isEmail().withMessage('Please provide a valid email address'),
    required(body('phone').trim(), 'Phone number is required')
      .matches(/^[+]?[\d\s-]{7,15}$/).withMessage('Phone number must be 7-15 digits'),
    required(body('department').trim(), 'Department is required')
      .notEmpty().withMessage('Department is required'),
    required(body('designation').trim(), 'Designation is required')
      .notEmpty().withMessage('Designation is required'),
    required(body('joiningDate'), 'Joining date is required')
      .isISO8601().withMessage('Joining date must be a valid date'),
    body('status').optional().isIn(['Active', 'Inactive']).withMessage('Status must be Active or Inactive'),
    handleValidation,
  ];
};

module.exports = {
  validateCreate: employeeFields(false),
  validateUpdate: [idParam, ...employeeFields(true)],
  validateId: [idParam, handleValidation],
  validateList: [
    query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100'),
    query('status').optional().isIn(['Active', 'Inactive']).withMessage('status must be Active or Inactive'),
    handleValidation,
  ],
};
