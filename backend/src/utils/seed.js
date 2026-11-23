require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Employee = require('../models/Employee');

const data = [
  ['Aarav Sharma', 'aarav.sharma@company.com', '+91 98765 43210', 'Engineering', 'Senior Developer', '2021-03-15', 'Active'],
  ['Priya Verma', 'priya.verma@company.com', '+91 98123 45678', 'Design', 'UI/UX Designer', '2022-07-01', 'Active'],
  ['Rohan Mehta', 'rohan.mehta@company.com', '+91 99887 76655', 'Marketing', 'Marketing Manager', '2020-11-20', 'Inactive'],
  ['Sneha Iyer', 'sneha.iyer@company.com', '+91 97001 22334', 'Human Resources', 'HR Executive', '2023-01-09', 'Active'],
  ['Karan Singh', 'karan.singh@company.com', '+91 91234 56780', 'Engineering', 'Backend Developer', '2022-02-14', 'Active'],
  ['Ananya Gupta', 'ananya.gupta@company.com', '+91 90909 80808', 'Finance', 'Accountant', '2019-09-30', 'Active'],
  ['Vikram Rao', 'vikram.rao@company.com', '+91 98700 11223', 'Sales', 'Sales Lead', '2021-12-05', 'Inactive'],
  ['Neha Joshi', 'neha.joshi@company.com', '+91 96543 21098', 'Engineering', 'QA Engineer', '2023-05-22', 'Active'],
].map(([name, email, phone, department, designation, joiningDate, status]) => ({
  name, email, phone, department, designation, joiningDate, status,
}));

(async () => {
  try {
    await connectDB();
    await Employee.deleteMany({});
    await Employee.insertMany(data);
    console.log(`Seeded ${data.length} employees`);
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
