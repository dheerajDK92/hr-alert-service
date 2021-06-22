const mongoose = require("mongoose");

const AssetsList = new mongoose.Schema({
  companyId: {
    type: String,
    required: true,
  },
  assetName: {
    type: String,
    required: true,
  },
  assetCategory: {
    type: String,
    required: true,
  },
  assetPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Assets", AssetsList);
