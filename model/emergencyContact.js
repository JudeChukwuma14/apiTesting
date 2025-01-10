const mongoose = require("mongoose")

const emergencyContactSchema = new mongoose.Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    address: {
        street: { type: String },
        addressLine2: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
      },
      email: { type: String },
      relationship: { type: String },
})

module.exports = mongoose.model("EmergencyContact", emergencyContactSchema)
