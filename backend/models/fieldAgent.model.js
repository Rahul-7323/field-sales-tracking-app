const mongoose = require('mongoose')

const fieldAgentSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  phoneNumber: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  locations: [{
    lat: { type: Number },
    lng: { type: Number },
  }],
})

module.exports = mongoose.model('FieldAgent', fieldAgentSchema);