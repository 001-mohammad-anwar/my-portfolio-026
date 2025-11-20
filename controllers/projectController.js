const projectSchema = require("../model/projectModel.js");
const uploadImageCloudinary = require("../utils/uploadImageCloudinary.js");
const cloudinary = require("cloudinary").v2;

exports.addProjectController = async (req, res) => {
  try {
    const {
      title,
      slug,
      short_description,
      description,
      techStack,
      liveUrl,
      githubUrl,
      category,
      isFeatured,
      status,
    } = req.body;

    if (!title || !slug) {
      return res.status(400).json({
        message: "title , slug are required",
        success: false,
        error: true,
      });
    }

    const techArr = techStack
      ? Array.isArray(techStack)
        ? techStack
        : techStack.split(",").map((s) => s.trim())
      : [];

    const payload = {
      title,
      slug,
      short_description,
      description,
      techStack: techArr,
      liveUrl,
      githubUrl,
      category,
      isFeatured: isFeatured === "true" || isFeatured === true,
      status: status || "Active",
      createdBy: req.user?._id || null,
    };

    const project = await projectSchema.create(payload);

    return res.status(201).json({
      success: true,
      error: false,
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "server error",
      success: false,
      error: true,
    });
  }
};

exports.updateProjectController = async (req, res) => {
  try {
    const { projectId } = req.params;

    const {
      title,
      slug,
      short_description,
      description,
      techStack,
      liveUrl,
      githubUrl,
      category,
      isFeatured,
      status,
    } = req.body;

    // Check ID
    if (!projectId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Project ID is required",
      });
    }

    // Find project
    const project = await projectSchema.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Project not found",
      });
    }

    // Convert tech stack
    const techArr = techStack
      ? Array.isArray(techStack)
        ? techStack
        : techStack.split(",").map((s) => s.trim())
      : project.techStack;

    // NEW IMAGES (if uploaded)
    let newImages = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadResult = await uploadImageCloudinary(file);
        if (uploadResult.secure_url) newImages.push(uploadResult.secure_url);
      }

      // Push new images to existing ones
      project.images.push(...newImages);
    }

    // Update only fields provided
    project.title = title || project.title;
    project.slug = slug || project.slug;
    project.short_description = short_description || project.short_description;
    project.description = description || project.description;
    project.techStack = techArr || project.techStack;
    project.liveUrl = liveUrl || project.liveUrl;
    project.githubUrl = githubUrl || project.githubUrl;
    project.category = category || project.category;
    project.isFeatured = isFeatured === "true" ? true : project.isFeatured;
    project.status = status || project.status;

    // Save changes
    await project.save();

    return res.status(200).json({
      success: true,
      error: false,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error",
      success: false,
      error: true,
    });
  }
};


exports.deleteProjectController = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Project ID is required",
      });
    }

    // Check if project exists
    const project = await projectSchema.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Project not found",
      });
    }

    // Delete images from Cloudinary (if exists)
    if (project.images && project.images.length > 0) {
      for (const imgUrl of project.images) {
        const publicId = imgUrl.split("/").pop().split(".")[0]; 

        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.log("Cloudinary delete error:", err);
        }
      }
    }

    // Delete project from DB
    await projectSchema.findByIdAndDelete(projectId);

    return res.status(200).json({
      success: true,
      error: false,
      message: "Project deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Server error",
    });
  }
};


exports.getProjectController = async (req, res) => {
  try {
    const project = await projectSchema.find().sort({ createdAt: -1 });

    if (!project.length) {
      return res.status(404).json({
        message: "project not found",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

exports.uploadProjectImageController = async (req, res) => {
  try {
    const { projectId } = req.body;
    const image = req.file;

    console.log("Received Image ", req.file);
    if (!projectId) {
      return res.status(400).json({
        message: "Project ID is required",
        success: false,
        error: true,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
        error: true,
        success: false,
      });
    }

    const uploadResult = await uploadImageCloudinary(image);

    console.log("uploaded", uploadResult);

    if (!uploadResult || !uploadResult.secure_url) {
      return res.status(500).json({
        message: "Cloudinary upload failed",
        success: false,
        error: true,
      });
    }

    const updatedProject = await projectSchema.findByIdAndUpdate(
      projectId,
      { $push: { images: uploadResult.secure_url } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      error: false,
      message: "image uploaded successfully",
      _id: projectId,
      imageUrl: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
