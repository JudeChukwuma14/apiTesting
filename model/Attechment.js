const mongoose = require("mongoose");
const attachmentsSchema = new mongoose.Schema({
  files: { type: [String] },
});

module.exports = mongoose.model("Files", attachmentsSchema);
