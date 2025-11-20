const express = require('express');
const { createSkillController, getSkillsController, updateSkillsController, deleteSkillController } = require('../controllers/skillController.js');


const Router = express.Router();

// 🧾 Routes
Router.post('/createSkills', createSkillController);
Router.get('/getSkills', getSkillsController);
Router.put('/updateSkill', updateSkillsController);
Router.delete('/deleteSkill', deleteSkillController);


module.exports = Router;
