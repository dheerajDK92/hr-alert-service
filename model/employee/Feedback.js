const mongoose = require("mongoose");

const employeeFeedback = new mongoose.Schema({
  companyId: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    max: 4000
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("EmployeeFeedback", employeeFeedback);
