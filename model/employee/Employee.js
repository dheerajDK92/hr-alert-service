const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
  empname: {
    type: String,
    required: true,
    max: 255,
  },
  empID: {
    type: String,
    required: true,
    max: 255,
  },
  isReportingManager: {
    type: Boolean,
  },
  Site: {
    type: String,
    required: true,
    max: 255,
  },
  designation: {
    type: String,
  },
  DOB: {
    type: String,
    max: 255,
  },
  DOJ: {
    type: String,
  },
  DOL: {
    type: String,
  },
  gender: {
    type: String,
    max: 10,
  },
  isHrAdmin: {
    type: Boolean,
  },
  isMonthlyCalculation: {
    type: Boolean,
  },
  companyId: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    max: 10,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  address: {
    type: String,
    max: 255,
  },
  address2: {
    type: String,
    max: 255,
  },
  pincode: {
    type: String,
    min: 6,
    max: 6,
  },
  city: {
    type: String,
    max: 255,
  },
  state: {
    type: String,
    max: 255,
  },
  country: {
    type: String,
    max: 255,
  },
  description: {
    type: String,
    max: 4000,
  },
  logo: {
    type: String,
    max: 4000,
  },
  logoID: {
    type: String,
    max: 4000,
  },
  startTime: {
    type: String,
    max: 255,
  },
  endtTime: {
    type: String,
    max: 255,
  },
  halfDayApplicable: {
    type: Boolean,
  },
  minHoursOfHalfDay: {
    type: String,
  },
  maxHoursOfContinousWork: {
    type: String,
  },
  weeklyOffs: {
    type: Array,
  },
  selfAttendanceMethod: {
    type: String,
    max: 20,
  },
  attendanceFromOffice: {
    type: Boolean,
  },
  imageWithAttendance: {
    type: Boolean,
  },
  fingerPrintAttendance: {
    type: Boolean,
  },
  overTimeApplicable: {
    type: Boolean,
  },
  BASIC: {
    type: Number,
  },
  DA: {
    type: Number,
  },
  SpecialAllowance: {
    type: Number,
  },
  OtherAllowance: {
    type: Number,
  },
  HRA: {
    type: Number,
  },
  TotalEarning: {
    type: Number,
  },
  ESICEmployer: {
    type: Number,
  },
  EPFEmployer: {
    type: Number,
  },
  ESICEmployee: {
    type: Number,
  },
  EPFEmployee: {
    type: Number,
  },
  PT: {
    type: Number,
  },
  MLWF: {
    type: Number,
  },
  OtherDeduction: {
    type: Number,
  },
  TotalDeduction: {
    type: Number,
  },
  NetTotal: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", empSchema);
