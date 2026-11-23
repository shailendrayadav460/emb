const express = require('express');
const ctrl = require('../controllers/employeeController');
const { validateCreate, validateUpdate, validateId, validateList } = require('../middleware/validate');

const router = express.Router();

router.route('/').get(validateList, ctrl.getEmployees).post(validateCreate, ctrl.createEmployee);

router
  .route('/:id')
  .get(validateId, ctrl.getEmployee)
  .put(validateUpdate, ctrl.updateEmployee)
  .delete(validateId, ctrl.deleteEmployee);

module.exports = router;
