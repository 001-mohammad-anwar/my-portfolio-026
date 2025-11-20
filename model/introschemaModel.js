const mongoose = require("mongoose");

// ✅ Define the schema
const introSchema = new mongoose.Schema({
  welcomeText: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // optional, adds createdAt and updatedAt

// ✅ Export the MODEL, not just the schema
const Intro = mongoose.model("Intro", introSchema);

module.exports = Intro;
