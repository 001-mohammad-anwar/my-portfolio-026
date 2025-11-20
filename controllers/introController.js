const Intro = require("../model/introschemaModel.js");



// ✅ Create Intro
exports.createIntro = async (req, res) => {
  try {
    const { welcomeText, firstName, lastName, caption, description } = req.body;

    const introduction = new Intro({
      welcomeText,
      firstName,
      lastName,
      caption,
      description,
    });

    const save = await introduction.save();

    return res.status(200).json({
      message: "Introduction created successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: true,
    });
  }
};

// ✅ Get Intro Info
exports.getIntroInfo = async (req, res) => {
  try {
    // Fetch all intro documents (or latest if you prefer)
    const introData = await Intro.find().sort({ createdAt: -1 }).limit(1); // latest intro

    if (!introData || introData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No intro data found",
        error: true,
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      data: introData[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: true,
    });
  }
};

exports.updateIntroInfo = async (req, res) => {
  try {
    const { _id, welcomeText, firstName, lastName, caption, description } =
      req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "_id is required to update intro",
        error: true,
      });
    }

    // Find the intro document by ID and update
    const updatedIntro = await Intro.findByIdAndUpdate(
      _id,
      { welcomeText, firstName, lastName, caption, description },
      { new: true } // return the updated document
    );

    if (!updatedIntro) {
      return res.status(404).json({
        success: false,
        message: "Intro not found",
        error: true,
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Intro updated successfully",
      data: updatedIntro,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
      error: true,
    });
  }
};

exports.deleteIntroInfo = async(req,res)=>{
  try {
     
    const { _id } = req.body;
    if(!_id){
      return res.status(400).json({
        success : false,
        message : "_id is required"
      })
    }

    const intro = await Intro.findById(_id);

    if(!intro) {
      return res.status(404).json({
        message : "intro not found",
        success : false,
        error : true
      })
    }

    await Intro.findByIdAndDelete(_id);

    return res.status(200).json({
      success : true ,
      message : "Intro deleted successfully"
    })

    
  } catch (error) {
    return res.status(500).json({
      message : error.message || error,
      success : false,
      error : true ,

    })
    
  }
}
