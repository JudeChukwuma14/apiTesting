const mongoose = require("mongoose");
const preferencesSchema = new mongoose.Schema({
  licensedDriver: { type: String, enum:["Yes", "No"] },
  willingToTravel30Mins: { type: String, enum:["Yes", "No"] },
  hospitalShifts: { type: String, enum:["Yes", "No"] },
  nursingHomeShifts: { type: String, enum:["Yes", "No"] },
  privateDutyCases: { type: String, enum:["Yes", "No"] },
  timeOfavailability: { type: Date },
  availability: {
    daysOfWeek: [
      {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    ],
  },
  hoursPerWeek: { type: String },
  handicaps: { type: String },
});

module.exports = mongoose.model("Preferences", preferencesSchema);
