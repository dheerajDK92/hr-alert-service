const mongoose = require("mongoose");

const employeeReimbursement = new mongoose.Schema({
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
  destination: {
    type: String,
    required: true,
  },
  expenseDate: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  reimbursementType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  remarks: {
    type: String,
    required: true,
  },
  hrRemarks: {
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

module.exports = mongoose.model("EmployeeReimbursement", employeeReimbursement);
