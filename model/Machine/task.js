const mongoose = require("mongoose");

const logTask = new mongoose.Schema({
  companyId: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  areaOfWork: {
    type: String,
    required: true,
  },
  generalCleaning: {
    type: String,
  },
  DampMoping: {
    type: String,
  },
  WashingSucrubbing: {
    type: String,
  },
  LitterPicking: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LogTask", logTask);
