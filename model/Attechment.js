const mongoose = require("mongoose");
const attachmentsSchema = new mongoose.Schema({
  images: { type: [String] },
});

module.exports = mongoose.model("Images", attachmentsSchema);
