const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    personalInfo: { type: mongoose.Schema.Types.ObjectId, ref: "PersonalInfo" },
    employmentHistory: [
      { type: mongoose.Schema.Types.ObjectId, ref: "EmploymentHistory" },
    ],
    desiredEmployment: { type: mongoose.Schema.Types.ObjectId,ref: "DesiredEmployment" },
    currentEmployer:{ type: mongoose.Schema.Types.ObjectId,ref:"CurrentEmployer" },
    education: { type: mongoose.Schema.Types.ObjectId, ref: "Education" },
    references: [{ type: mongoose.Schema.Types.ObjectId, ref: "References" }],
    skills: { type: mongoose.Schema.Types.ObjectId, ref: "Skills" },
    preferences: { type: mongoose.Schema.Types.ObjectId, ref: "Preferences" },
    agreement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agreement",
    },
    emergencycontact:{type: mongoose.Schema.Types.ObjectId,ref:"EmergencyContact"},
    certify:{type: mongoose.Schema.Types.ObjectId, ref:"Certify"},
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "Files" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
