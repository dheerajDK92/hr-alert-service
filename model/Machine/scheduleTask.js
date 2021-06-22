const mongoose = require("mongoose");

const scheduleTask = new mongoose.Schema({
  companyId: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  taskFor: {
    type: String,
    required: true,
  },
  taskDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ScheduleTask", scheduleTask);
