const mongoose = require("mongoose");
const preferencesSchema = new mongoose.Schema({
  licensedDriver: { type: Boolean },
  willingToTravel30Mins: { type: Boolean },
  hospitalShifts: { type: Boolean },
  nursingHomeShifts: { type: Boolean },
  privateDutyCases: { type: Boolean },
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
