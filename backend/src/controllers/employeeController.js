const Employee = require('../models/Employee');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// POST /api/employees
exports.createEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.create(req.body);
  res.status(201).json({ success: true, message: 'Employee created successfully', data: employee });
});

// GET /api/employees?search=&status=&department=&page=&limit=&sort=
exports.getEmployees = asyncHandler(async (req, res) => {
  const { search, status, department, sort = '-createdAt' } = req.query;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  const filter = {};
  if (status) filter.status = status;
  if (department) filter.department = department;
  if (search && search.trim()) {
    const rx = new RegExp(escapeRegex(search.trim()), 'i');
    filter.$or = [{ name: rx }, { email: rx }, { phone: rx }, { department: rx }, { designation: rx }];
  }

  const allowedSort = ['name', 'joiningDate', 'createdAt', 'department'];
  const sortBy = allowedSort.includes(String(sort).replace(/^-/, '')) ? sort : '-createdAt';

  const [data, total, stats, departments] = await Promise.all([
    Employee.find(filter).sort(sortBy).skip((page - 1) * limit).limit(limit),
    Employee.countDocuments(filter),
    Employee.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Employee.distinct('department'),
  ]);

  const counts = { total: 0, Active: 0, Inactive: 0 };
  stats.forEach((s) => {
    counts[s._id] = s.count;
    counts.total += s.count;
  });

  res.json({
    success: true,
    data,
    pagination: { page, limit, total, pages: Math.max(1, Math.ceil(total / limit)) },
    stats: counts,
    departments: departments.sort(),
  });
});

// GET /api/employees/:id
exports.getEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) throw new AppError('Employee not found', 404);
  res.json({ success: true, data: employee });
});

// PUT /api/employees/:id
exports.updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!employee) throw new AppError('Employee not found', 404);
  res.json({ success: true, message: 'Employee updated successfully', data: employee });
});

// DELETE /api/employees/:id
exports.deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) throw new AppError('Employee not found', 404);
  res.json({ success: true, message: 'Employee deleted successfully', data: { id: req.params.id } });
});
