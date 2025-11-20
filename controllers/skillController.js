const Skill = require("../model/skillsModel.js");
const About = require("../model/aboutModel.js")


exports.createSkillController = async (req, res) => {
  try {
    const { title, level, icon, category } = req.body;

    // 1️⃣ Validate input fields
    if (!title || !level || !icon || !category) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "title, level, icon, and category are required",
      });
    }

    // 2️⃣ Create new skill in database
    const newSkill = await Skill.create({ title, level, icon, category });
    
    // 3️⃣ Find existing About document (assuming you have only one)
    const about = await About.findOne().sort({ createdAt: -1 });

    if (about) {
      // 4️⃣ Check if skill already linked (avoid duplicates)
      const alreadyLinked = about.skills.some(
        (skillId) => skillId.toString() === newSkill._id.toString()
      );

      if (!alreadyLinked) {
        about.skills.push(newSkill._id);
        await about.save();
        console.log("✅ About updated with new skill:", newSkill.title);
      } else {
        console.log("ℹ️ Skill already exists in About.skills");
      }
    } else {
      console.log("⚠️ No About document found — please create one first!");
    }

    // 5️⃣ Send response
    return res.status(201).json({
      success: true,
      message: "Skill created successfully and About updated",
      data: newSkill,
    });
  } catch (error) {
    console.error("❌ Skill creation error:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Server error",
    });
  }
};



exports.getSkillsController = async (req, res) => {
  try {
    const skillsData = await Skill.find().sort({ createdAt: -1 })

    if (!skillsData.length) {
      return res.status(400).json({
        message: "No skill data found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      success: true,
      data: skillsData,
    });


  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

exports.updateSkillsController = async(req,res)=>{
  try {
    const {_id , title , level , icon , category} = req.body;
    if(!title  ||  !level ||  !icon  ||  !category ){
      return res.status(400).json({
        message : "title , level , icon , category are required",
        success : false ,
        error : true
      })
    }

    let skill = await Skill.findOne({_id}).sort({ createdAt: -1 });

    if(skill){
      skill.title = title
      skill.level =  level
      skill.icon = icon
      skill.category = category

       await skill.save();
    } else {
       skill = await Skill.create({
          title , level , icon , category
       })
    }

     return res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    });
    


  } catch (error) {
    return res.status(500).json({
      message : error.message || "server error ",
      success : false ,
      error : true
    })
    
  }
}


exports.deleteSkillController = async (req, res) => {
  try {
    const { _id } = req.body; // or req.body depending on frontend

    const deletedSkill = await Skill.findByIdAndDelete(_id);

    if (!deletedSkill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
        error: true,
      });
    }

    // ✅ Remove skill from About.skills
    const about = await About.findOne().sort({ createdAt: -1 });
    if (about) {
      about.skills = about.skills.filter(
        (skillId) => skillId.toString() !== deletedSkill._id.toString()
      );
      await about.save();
      console.log("✅ About updated: removed deleted skill ID");
    }

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully and About updated",
    });
  } catch (error) {
    console.error("Skill delete error:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Server error",
    });
  }
};
