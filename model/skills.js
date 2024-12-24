const mongoose = require("mongoose");
const skillsSchema = new mongoose.Schema({
  vitalSigns: { type: Boolean },
  nursesNotes: { type: Boolean },
  catheterCare: { type: Boolean },
  insertCatheters: { type: Boolean },
  startIVs: { type: Boolean },
  suctionPatients: { type: Boolean },
  oxygenSetup: { type: Boolean },
  neurologicalAssessment: { type: Boolean },
  intramuscularMeds: { type: Boolean },
  ivMeds: { type: Boolean },
  patientAssessment: { type: Boolean },
  patientDischarge: { type: Boolean },
  cpr: { type: Boolean },
  icuExperience: { type: Boolean },
  medSurgExperience: { type: Boolean },
  specialTraining: { type: String },
});

module.exports = mongoose.model("Skills", skillsSchema);
