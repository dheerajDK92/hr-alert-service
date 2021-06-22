const mongoose = require("mongoose");

const employeeBreak = new mongoose.Schema({
  companyId: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  breakDate: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
  },
  stopTime: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Break", employeeBreak);
