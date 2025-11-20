const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true }, // e.g. React
    level: { type: Number, default: 70, min: 0, max: 100 }, // percentage
    icon: { type: String, default: "" }, // optional icon URL or class
    category: { type: String, default: "" }, // e.g. frontend/backend/tooling
  },
  { timestamps: true }
);



module.exports = mongoose.model("skillSchema", skillSchema);