

const aboutModel = require('../model/aboutModel.js');
const Education = require('../model/educationModel.js');

// ✅ Create Education Controller
exports.educationController = async (req, res) => {
  try {
    const { degree, institute, startYear, endYear, description } = req.body;

    // ✅ Validation
    if (!degree || !institute || !startYear || !endYear) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "All required fields (degree, institute, startYear, endYear) must be provided",
      });
    }

    // ✅ Create new education document
    const newEducation = await Education.create({
      degree,
      institute,
      startYear,
      endYear,
      description,
    });

    const about = await aboutModel.findOne().sort({createdAt : -1});

   if(about){
     const alreadyExist = about.education.some((educationId) => educationId.toString() === newEducation._id.toString());
    
    if(!alreadyExist) {
      about.education.push(newEducation._id);
      await about.save();
       console.log("✅ About updated with new education:", newEducation.institute);
    }else{
      console.log("About already exists in About.education :", newEducation)
    }
   }else{
    console.log("⚠️ No About document found — please create one first!")
   }

    // const savedEducation = await newEducation.save();

    return res.status(201).json({
      success: true,
      error: false,
      message: "Education added successfully",
      data: newEducation,
    });

  } catch (error) {
    console.error("Education creation error:", error);
    return res.status(500).json({
      message: error.message || "Server Error",
      error: true,
      success: false,
    });
  }
};

exports.geteducationController = async(req,res)=>{
  try {
       
    const education = await Education.find().sort({ createdAt: -1})
    
    if(!education.length) {
      return res.status(400).json({
        message : "No education data found",
        success : false ,
        error : true
      })
    }

    return res.status(201).json({
      success : true,
      data : education,
      error : false
    })
    
  } catch (error) {
     return res.status(500).json({
      message : error.message || error ,
      success : false ,
      error : true 
     })
    
  }
}


exports.updateeducationController =async(req,res)=>{
  try {
      const {_id , degree, institute, startYear, endYear, description} = req.body;
      if(!_id || !degree || !institute || !startYear || !endYear || !description){
        return res.status(402).json({
          message : "degree, institute, startYear, endYear, description are required",
          message : false,
          error : true 
        })
      }

    let education = await Education.findOne({_id}).sort({ createdAt: -1});

    if(education){
       education.degree = degree;
       education.institute = institute;
       education.startYear = startYear;
       education.endYear = endYear;

       await education.save();
    }else{
      education = await education.create({
        degree, institute, startYear, endYear, description
      })
    }

    return res.status(201).json({
      success : true,
      message : "education updated successfylly",
      data : education
    })


  } catch (error) {
    return res.status(500).json({
      message : error.message || "server error ",
      success : false,
      error : true
    })
    
  }
}

exports.deleteEducationController = async (req, res) => {
  try {
    const { _id } = req.body; // education id

    // 1️⃣ Check if the Education exists
    const education = await Education.findById(_id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    // 2️⃣ Delete education document
    await Education.findByIdAndDelete(_id);

    // 3️⃣ Remove from About.education array
    const about = await aboutModel.findOne().sort({ createdAt: -1 });
    if (about) {
      about.education = about.education.filter(
        (eduId) => eduId.toString() !== _id.toString()
      );
      await about.save();
      console.log("✅ Removed education from About:", education.institute);
    }

    return res.status(200).json({
      success: true,
      message: "Education deleted successfully and About updated",
    });

  } catch (error) {
    console.error("❌ Education delete error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

