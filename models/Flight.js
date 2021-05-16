const mongoose = require("mongoose");

const { Schema } = mongoose;

const FlightSchema = new Schema({
  price: Number,
  route: {
    origin: String,
    destination: String,
  },
  seats: [
    {
      seat: String,
    },
  ],
});

module.exports = mongoose.model("Flight", FlightSchema);
