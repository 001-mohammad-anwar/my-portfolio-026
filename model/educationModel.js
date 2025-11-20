const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema(
  {
    degree: String,
    institute: String,
    startYear: String,
    endYear: String,
    description: String,
  },
   { timestamps: true }
);

module.exports = mongoose.model("educationSchema", educationSchema);