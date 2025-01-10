const mongoose = require("mongoose");
const educationSchema = new mongoose.Schema({
  highSchool: {
    name: { type: String },
    yearsAttended: { type: Number },
    graduated: { type: String, enum:["Yes", "No"] },
    major: { type: String },
  },
  college: {
    name: { type: String },
    yearsAttended: { type: Number },
    graduated: { type: String, enum:["Yes", "No"] },
    major: { type: String },
  },
  professionalTraining: {
    name: { type: String },
    yearsAttended: { type: Number },
    graduated: { type: String, enum:["Yes", "No"] },
    certification: { type: String },
  },
});

module.exports = mongoose.model("Education", educationSchema);
