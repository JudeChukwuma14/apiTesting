const mongoose = require("mongoose");
const certifySchema = new mongoose.Schema({
    isEligible:{type:String, enum:["Yes","No"]},
  convictedFiveYears: { type: String, enum:["Yes", "No"] },
  iCertify: { type: Boolean },
  checkApply:{ type: String, enum:["RN", "LPN", "GNA/CNA"] },
  other:{ type: String},
  state: { type: String },
});

module.exports = mongoose.model("Certify", certifySchema);
