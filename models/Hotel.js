const mongoose = require('mongoose');

const { Schema } = mongoose;

const HotelSchema = new Schema({
  name: String,
  location:{
  state: String,
  city: String,
  },
  bedroom:[{
    persons: Number,
    bed: Number
  }],
  images:[String]
})

module.exports = mongoose.model('Hotels', HotelSchema);
