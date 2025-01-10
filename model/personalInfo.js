const mongoose = require("mongoose");
const personalInfoSchema = new mongoose.Schema({
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  address: {
    street: { type: String },
    line: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
  },
  email: { type: String },
  phone: { type: String },
  is18OrOlder: { type: String, enum:["Yes", "No"] },
});

module.exports = mongoose.model("PersonalInfo", personalInfoSchema);