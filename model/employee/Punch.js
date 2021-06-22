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
  punchDate: {
    type: String,
    required: true,
  },
  // punchOutDate: {
  //   type: String,
  // },
  startTime: {
    type: String,
  },
  stopTime: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  address: {
    type: String,
  },
  clockInImage: {
    type: String,
  },
  clockOutImage: {
    type: String,
  },
  employeeDetail:{
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Punch", employeeBreak);
