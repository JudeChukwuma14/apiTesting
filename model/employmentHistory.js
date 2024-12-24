const mongoose = require("mongoose");
const employmentHistorySchema = new mongoose.Schema({
    employerName: { type: String },
    jobTitle: { type: String },
    address: {
      street: { type: String },
      line: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
    },
    from: { type: Date },
    to: { type: Date },
    natureOfWork: { type: String },
    hourlyRate: { type: Number },
    phone: { type: String },
    supervisorName: { type: String },
    comments: { type: String },
  });
  
  module.exports = mongoose.model("EmploymentHistory", employmentHistorySchema);
  