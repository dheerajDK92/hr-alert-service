const mongoose = require("mongoose");

const employeeBankSchema = new mongoose.Schema({
  companyId: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  bankAccountNumber: {
    type: String,
  },
  IFSC: {
    type: String,
  },
  BRANCH: {
    type: String,
  },
  BANK: {
    type: String,
  },
  BANKCODE: {
    type: String,
  },
  CENTRE: {
    type: String,
  },
  CITY: {
    type: String,
  },
  DISTRICT: {
    type: String,
  },
  STATE: {
    type: String,
  },
  ADDRESS: {
    type: String,
  },
  CONTACT: {
    type: String,
  },
  UPI: {
    type: Boolean,
  },
  RTGS: {
    type: Boolean,
  },
  NEFT: {
    type: Boolean,
  },
  IMPS: {
    type: Boolean,
  },
  MICR: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("EmployeeBank", employeeBankSchema);
