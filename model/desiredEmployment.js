const mongoose = require("mongoose");

const desiredEmploymentSchema = new mongoose.Schema({
    position: {
      type: String,
      enum: [
        "Registered Nurse",
        "Medication Technician",
        "Certified Nursing Assistant (CNA)",
        "Home Health Aide",
        "Licensed Practical Nurse (LPN)",
      ],
    },
    desiredSalary: { type: Number },
    startDate: { type: Date },
    isCurrentlyEmployed: { type: String, enum:["Yes", "No"] },
    referalSource: {
      type: String,
      enum: [
        "Friend",
        "Employee",
        "Advertisement",
        "Government Placement Agency",
        "Internet",
        "Other",
      ],
    },
    mayInquireCurrentEmployer: { type: String, enum:["Yes", "No"] },
    hasWorkedForCompany: { type: String, enum:["Yes", "No"] },
  });

  module.exports = mongoose.model("DesiredEmployment",desiredEmploymentSchema)