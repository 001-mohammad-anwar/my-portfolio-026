const express = require('express');
const { addProjectController, getProjectController, deleteProjectController, updateProjectController, uploadProjectImageController } = require('../controllers/projectController.js');


const Router = express.Router();

// 🧾 Routes
Router.post('/createproject', addProjectController);
Router.get('/getproject', getProjectController);
Router.delete('/delete' , deleteProjectController);
Router.put('/update' , updateProjectController);


module.exports = Router;
