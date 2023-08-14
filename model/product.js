const mongoose = require("mongoose");
const { Schema } = mongoose;

//schema
const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, min: [0, "wrong price"], required: true },
  discountPercentage: {
    type: Number,
    min: [0, "wrong min discount"],
    max: [50, "wrong max discount"],
  }, //Number can be used for decimal values
  rating: {
    type: Number,
    min: [0, "wrong min rating"],
    max: [10, "wrong max rating"],
    default: 0,
  },
  stock: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: [String],
});

//model
exports.Product = mongoose.model("Product", productSchema); //the name is Singular Product in the concept of Model
