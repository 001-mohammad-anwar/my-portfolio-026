const mongoose = require("mongoose");

// const introSchema = new mongoose.Schema({
//   welcomeText: {
//     type: String,
//     required: true,
//   },
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
//   caption: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
// });

// models/Skill.js

// const skillSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true, trim: true }, // e.g. React
//     level: { type: Number, default: 70, min: 0, max: 100 }, // percentage
//     icon: { type: String, default: "" }, // optional icon URL or class
//     category: { type: String, default: "" }, // e.g. frontend/backend/tooling
//   },
//   { timestamps: true }
// );

// const educationSchema = new mongoose.Schema(
//   {
//     degree: String,
//     institute: String,
//     startYear: String,
//     endYear: String,
//     description: String,
//   },
//   { _id: false }
// );

// models/About.js

// const aboutSchema = new mongoose.Schema(
//   {
//     fullName: { type: String, default: "" },
//     title: { type: String, default: "" }, // e.g. "Full Stack Developer"
//     bio: { type: String, default: "" },
//     profileImage: { type: String, default: "" }, // Cloudinary
//     resumeUrl: { type: String, default: "" }, // link to resume PDF
//     contactEmail: { type: String, default: "" },
//     phone: { type: String, default: "" },
//     location: { type: String, default: "" },
//     socials: {
//       // optional
//       linkedin: { type: String, default: "" },
//       github: { type: String, default: "" },
//       twitter: { type: String, default: "" },
//       instagram: { type: String, default: "" },
//     },
//     lottieURL: {
//       type: String,
//       required: true,
//     },
//     discription1: {
//       type: String,
//       required: true,
//     },
//     discription2: {
//       type: String,
//       required: true,
//     },
//     skills: [skillSchema], // array of skils
//     education: [educationSchema], // array of educations
//   },
//   { timestamps: true }
// );

// const exprienceSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   period: {
//     type: String,
//     required: true,
//   },
//   company: {
//     type: Srting,
//     required: true,
//   },
//   descriptiuon: {
//     type: String,
//     required: true,
//   },
// });

// const projectSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true, trim: true },
//     slug: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     short_description: { type: String, default: "" },
//     description: { type: String, default: "" },
//     images: [{ type: String }],
//     techStack: [{ type: String }],
//     liveUrl: { type: String, default: "" },
//     githubUrl: { type: String, default: "" },
//     category: { type: String, default: "" },
//     isFeatured: { type: Boolean, default: false },
//     status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// const contactSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   gender: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   mobile: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
// });

// 🧾 Create models
const Intro = mongoose.model("Intro", introSchema);
const About = mongoose.model("About", aboutSchema);
const Skill = mongoose.model("Skill", skillSchema); // optional if you want a separate skills collection
const project = mongoose.model("project",projectSchema);
const exprience = mongoose.model("exprience" , exprienceSchema);
const contact =  mongoose.model('contact' , contactSchema);


// 🧱 Export all
module.exports = {
  Intro,
  About,
  Skill,
  project,
  exprience,
  contact
};
