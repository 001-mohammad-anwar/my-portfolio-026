const express = require('express');
const { aboutUsController, getAboutController, updatedAboutController, deleteAboutController } = require('../controllers/AboutController.js');


const Router = express.Router();

// 🧾 Routes
Router.post('/createAbout', aboutUsController);
Router.get('/getAbout', getAboutController);

Router.put('/updatedAbout', updatedAboutController);
Router.delete('/deleteAbout', deleteAboutController);

module.exports = Router;
