const mongoose = require("mongoose");
const personalInfoSchema = new mongoose.Schema({
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  address: {
    street: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
  },
  email: { type: String },
  phone: { type: String },
  is18OrOlder: { type: Boolean },
});

module.exports = mongoose.model("PersonalInfo", personalInfoSchema);
