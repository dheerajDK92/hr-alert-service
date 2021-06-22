const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    max: 255,
  },
  phone: {
    type: String,
    required: true,
    max: 10,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    max: 255,
  },
  address2: {
    type: String,
    max: 255,
  },
  pincode: {
    type: String,
    required: true,
    min: 6,
    max: 6,
  },
  city: {
    type: String,
    required: true,
    max: 255,
  },
  state: {
    type: String,
    required: true,
    max: 255,
  },
  country: {
    type: String,
    required: true,
    max: 255,
  },
  EmpLimit:{
    type:Number
  },
  description: {
    type: String,
    required: true,
    max: 4000,
  },
  logo:{
    type: String,
    max: 4000,
  },
  logoID:{
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Company", companySchema);
