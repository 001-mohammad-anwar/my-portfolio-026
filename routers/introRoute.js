const express = require('express');
const { createIntro, getIntroInfo, updateIntroInfo, deleteIntroInfo  } = require('../controllers/introController.js');


const Router = express.Router();

// 🧾 Routes
Router.post('/intro', createIntro);
Router.get('/getIntro', getIntroInfo);
Router.put('/updateIntro', updateIntroInfo);
Router.delete('/deleteIntro', deleteIntroInfo);

module.exports = Router;
