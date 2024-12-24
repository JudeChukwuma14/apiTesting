const mongoose = require("mongoose");
const agreementSchema = new mongoose.Schema({
  certifyTrueInfo: { type: Boolean },
  signature: { type: String },
  applicationDate: { type: Date },
});

module.exports = mongoose.model("Agreement", agreementSchema);