const mongoose = require("mongoose");
const educationSchema = new mongoose.Schema({
  highSchool: {
    name: { type: String },
    yearsAttended: { type: Number },
    graduated: { type: Boolean },
    major: { type: String },
  },
  college: {
    name: { type: String },
    yearsAttended: { type: Number },
    graduated: { type: Boolean },
    major: { type: String },
  },
  professionalTraining: {
    name: { type: String },
    yearsAttended: { type: Number },
    graduated: { type: Boolean },
    certification: { type: String },
  },
});

module.exports = mongoose.model("Education", educationSchema);
