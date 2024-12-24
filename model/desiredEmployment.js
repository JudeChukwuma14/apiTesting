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
    isCurrentlyEmployed: { type: Boolean },
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
    mayInquireCurrentEmployer: { type: Boolean },
    hasWorkedForCompany: { type: Boolean },
  });

  module.exports = mongoose.model("DesiredEmployment",desiredEmploymentSchema)