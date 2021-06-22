const mongoose = require("mongoose");

const employeePAN = new mongoose.Schema({
  companyId: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  PAN: {
    type: String,
  },
  DOB: {
    type: String,
  },
  status: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("EmployeePAN", employeePAN);
