const express = require("express");
const { createContactController, getAllContacts, updatedCOntroller, deleteupdateController } = require("../controllers/contactController.js");

const Router = express.Router();

Router.post('/createContact', createContactController)
Router.get('/getContact', getAllContacts)
Router.put('/updateContact', updatedCOntroller)
Router.delete('/deleteContact', deleteupdateController)


module.exports = Router