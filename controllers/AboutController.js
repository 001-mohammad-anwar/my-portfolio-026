const About = require("../model/aboutModel.js");
const Skill = require("../model/skillsModel.js");
const Education = require("../model/educationModel.js");

// ✅ Create About section with auto skills/education linking
exports.aboutUsController = async (req, res) => {
  try {
    const {
      fullName,
      title,
      bio,
      contactEmail,
      phone,
      location,
      socials,
      lottieURL,
      discription1,
      discription2,
    } = req.body;

    // ✅ Required field validation
    if (!lottieURL || !discription1 || !discription2) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "lottieURL, discription1, and discription2 are required",
      });
    }

    // ✅ Automatically fetch all Skills & Education
    const allSkills = await Skill.find();
    const allEducation = await Education.find();

    // ✅ Extract their IDs if present
    const skillIds = allSkills.length ? allSkills.map((s) => s._id) : [];
    const educationIds = allEducation.length ? allEducation.map((e) => e._id) : [];

    // ✅ Create About document
    const about = new About({
      fullName,
      title,
      bio,
      contactEmail,
      phone,
      location,
      socials,
      lottieURL,
      discription1,
      discription2,
      skills: skillIds.map((s) => s._id),
      education: educationIds.map((e)=>e._id),
    });

    const savedAbout = await about.save();

    // ✅ Populate the related skills and education (if any)
    const populatedAbout = await About.findById(savedAbout._id)
      .populate("skills")
      .populate("education");

    return res.status(201).json({
      success: true,
      message: "About section created successfully",
      data: populatedAbout,
    });
  } catch (error) {
    console.error("About creation error:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Server Error",
    });
  }
};


exports.getAboutController = async (req, res) => {
  try {
    // ✅ Fetch the latest About document
    const aboutData = await About.findOne().sort({ createdAt: -1 });

    if (!aboutData) {
      return res.status(404).json({
        success: false,
        message: "No About data found",
      });
    }

    // ✅ Fetch the latest skills and education separately
    const latestSkills = await Skill.find({}).sort({ createdAt: -1 });
    const latestEducation = await Education.find({}).sort({ createdAt: -1 });

    // ✅ Sync About with the latest skills and education IDs
    aboutData.skills = latestSkills.map((s) => s._id);
    aboutData.education = latestEducation.map((e) => e._id);

    // ✅ Save only if needed (optional, to keep About updated in DB)
    await aboutData.save();

    // ✅ Populate with full skill and education data before returning
    const populatedAbout = await About.findById(aboutData._id)
      .populate("skills")
      .populate("education");

    res.status(200).json({
      success: true,
      message: "Fetched latest About, Skills, and Education successfully",
      data: populatedAbout,
    });
  } catch (error) {
    console.error("About fetch error:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

exports.updatedAboutController = async(req,res)=>{
  try {
    const {fullName,
      title,
      bio,
      contactEmail,
      phone,
      location,
      socials,
      lottieURL,
      discription1,
      discription2} = req.body

      if(!fullName || !title || !contactEmail || !phone || !discription1 || !lottieURL){
        return res.status(400).json({
          message : "fullName, title , contactEmail , Phone, discription1 and lottieURL are required",
          success : false, 
          error : true 
        })
      }

    let about = await About.findOne().sort({ createdAt: -1 });

    if(about){
      about.fullName = fullName;
      about.title = title;
      about.bio = bio;
      about.contactEmail = contactEmail;
      about.phone = phone;
      about.location = location;
      about.socials = socials;
      about.lottieURL = lottieURL;
      about.discription1 = discription1;
      about.discription2 = discription2;

     await about.save();
    }else{
       about = await About.create({
        fullName,
        title,
        bio,
        contactEmail,
        phone,
        location,
        socials,
        lottieURL,
        discription1,
        discription2,
      });
    }

    // ✅ Fetch latest skills and education (optional auto-sync)
    const latestSkills = await Skill.find().sort({ createdAt: -1 });
    const latestEducation = await Education.find().sort({ createdAt: -1 });

    about.skills = latestSkills.map((s) => s._id);
    about.education = latestEducation.map((e) => e._id);
    await about.save();

    // ✅ Populate before sending back
    const populatedAbout = await About.findById(about._id)
      .populate("skills")
      .populate("education");

    return res.status(200).json({
      success: true,
      message: "About section updated successfully",
      data: populatedAbout,
    });


  } catch (error) {
    return res.status(500).json({
      message : error.message || error ,
      success : false ,
      error : true 
    })
    
  }
}

// ✅ Delete About section
exports.deleteAboutController = async (req, res) => {
  try {
    const { _id } = req.body;
    console.log("this is about document id", _id)

    // 🧩 Check if About exists
    const aboutData = await About.findById(_id);
    if (!aboutData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "About section not found",
      });
    }

    // 🗑️ Delete the About document
    await About.findByIdAndDelete(_id);

    return res.status(200).json({
      success: true,
      message: "About section deleted successfully",
    });
  } catch (error) {
    console.error("About delete error:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Server Error",
    });
  }
};

