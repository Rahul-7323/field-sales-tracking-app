const mongoose = require('mongoose')

const supervisorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
})

module.exports = mongoose.model('Supervisor', supervisorSchema);