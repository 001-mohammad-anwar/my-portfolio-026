const mongoose =  require('mongoose')


const exprienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  company: {
    type: Srting,
    required: true,
  },
  descriptiuon: {
    type: String,
    required: true,
  },
});

module.exports = exprienceSchema