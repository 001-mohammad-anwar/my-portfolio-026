const express = require('express');

const { educationController, deleteEducationController, updateeducationController, geteducationController } = require('../controllers/educationController.js');


const Router = express.Router();

// 🧾 Routes
Router.post('/createEducation', educationController);
Router.delete('/deleteEducation', deleteEducationController);
Router.put('/updateEducation', updateeducationController);
Router.get('/getEducationData', geteducationController);



module.exports = Router;
