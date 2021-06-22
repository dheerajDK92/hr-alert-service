const mongoose = require("mongoose");

const employeeSalary = new mongoose.Schema({
  companyId: {
    type: String,
    required: true,
  },
  month: {
    type: String,
  },
  empName: {
    type: String,
  },
  BASIC: {
    type: String,
  },
  DA: {
    type: String,
  },
  SpecialAllowance: {
    type: String,
  },
  OtherAllowance: {
    type: String,
  },
  GROSSEARNING: {
    type: String,
  },
  EPFEmployee: {
    type: String,
  },
  ESICEmployee: {
    type: String,
  },
  PT: {
    type: String,
  },
  MLWF: {
    type: String,
  },
  OtherDeduction: {
    type: String,
  },
  GROSSDEDUCION: {
    type: String,
  },
  NETEARNING: {
    type: String,
  },
  employeeId: {
    type: String,
  },
  HRA: {
    type: String,
  },
  OtherEarning: {
    type: String,
  },
  WashAll: {
    type: String,
  },
  PF: {
    type: String,
  },
  PTAX: {
    type: String,
  },
  LoanDeduction: {
    type: String,
  },
  AdvDeduction: {
    type: String,
  },
  SITE: {
    type: String,
  },
  CHEQUE: {
    type: String,
  },
  GROSSFIXED: {
    type: String,
  },
  paidDays: {
    type: String,
  },
  ConvAll: {
    type: String,
  },
  ProdIncentive: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("EmployeeSalary", employeeSalary);
