const express = require("express");
const upload = require("../middleware/multer-middleware.js");
const { uploadProjectImageController } = require("../controllers/projectController.js");

const uploadRouter = express.Router();

uploadRouter.route('/uploadImage').post(upload.single("image"), uploadProjectImageController);


module.exports = uploadRouter;
 