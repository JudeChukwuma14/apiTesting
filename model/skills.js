const mongoose = require("mongoose");
const skillsSchema = new mongoose.Schema({
  vitalSigns: { type: String, enum:["Yes", "No"] },
  nursesNotes: { type: String, enum:["Yes", "No"] },
  catheterCare: { type: String, enum:["Yes", "No"] },
  insertCatheters: { type: String, enum:["Yes", "No"] },
  startIVs: { type: String, enum:["Yes", "No"] },
  suctionPatients: { type: String, enum:["Yes", "No"] },
  oxygenSetup: { type: String, enum:["Yes", "No"] },
  neurologicalAssessment: { type: String, enum:["Yes", "No"] },
  intramuscularMeds: { type: String, enum:["Yes", "No"] },
  ivMeds: { type: String, enum:["Yes", "No"] },
  patientAssessment: { type: String, enum:["Yes", "No"] },
  patientDischarge: { type: String, enum:["Yes", "No"] },
  cpr: { type: String, enum:["Yes", "No"] },
  icuExperience: { type: String, enum:["Yes", "No"] },
  medSurgExperience: { type: String, enum:["Yes", "No"] },
  specialTraining: { type: String },
});

module.exports = mongoose.model("Skills", skillsSchema);
