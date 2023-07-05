const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const destinationSchema = new mongoose.Schema({
  destinationId: Number,
  name: { type: String, minlength: 2, max: 100 },
  category: { type: String, minlength: 2, max: 100 },

  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
  },

  images: [String],
  explanation: String,

  ratings: [
    {
      rating: { type: Number, min: 1, max: 5 },
      review: String,
      user: { type: mongoose.SchemaTypes.ObjectId },
    },
  ],

  timeToVisit: String,
  nearBy: String,
  stay: String,
  eateries: String,
  travelMode: [String],
  guides: String,

  status: Number,

  createdAt: { type: Date, default: Date.now },
});

destinationSchema.plugin(autoIncrement, { inc_field: "destinationId" });

module.exports = mongoose.model("Destination", destinationSchema);
