const  mongoose = require("mongoose");

const referenceSchema = new mongoose.Schema({
  name: {
    firstName: { type: String},
    lastName: { type: String},
  },
  address: {
    street: { type: String },
    line: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
  },
  business:{type: String},
  email: { type: String },
  phone: { type: String },
  from: { type: Date },
  to: { type: Date },

});

module.exports = mongoose.model("References", referenceSchema);