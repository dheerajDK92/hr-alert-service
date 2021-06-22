const mongoose = require("mongoose");

const employeeAdhaar = new mongoose.Schema({
  companyId: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  ADHAAR: {
    type: Number,
  },
  status: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("EmployeeAdhaar", employeeAdhaar);
