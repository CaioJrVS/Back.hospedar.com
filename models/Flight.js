const mongoose = require("mongoose");

const { Schema } = mongoose;

const FlightSchema = new Schema({
  price: Number,
  schedule:{
    departing: Date,
    arrival: Date
  },
  route: {
    origin: String,
    destination: String,
  },
  passengers: [
    {
      Name: String,
      Seat: String
    }
  ] 
});

module.exports = mongoose.model("Flight", FlightSchema);
