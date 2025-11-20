const mongoose = require("mongoose");

// ✅ import other models
const Skill = require("../model/skillsModel.js");
const Education = require("../model/educationModel.js");

const aboutSchema = new mongoose.Schema(
  {
    fullName: { type: String, default: "" },
    title: { type: String, default: "" },
    bio: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    contactEmail: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    socials: {
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
    lottieURL: { type: String, required: true },
    discription1: { type: String, required: true },
    discription2: { type: String, required: true },

    // ✅ connect skills and education by reference (ObjectId)
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "skillSchema" }],
    education: [{ type: mongoose.Schema.Types.ObjectId, ref: "educationSchema" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);
