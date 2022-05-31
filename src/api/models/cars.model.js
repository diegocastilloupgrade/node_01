const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const carSchema = new Schema(
  {
    model: { type: String, required: true },
    year: { type: Number, required: true },
    brand: { type: String, required: true },
    doors: { type: Number, required: false },
    picture:{type: String, required:false}
  },
  { timestamps: true }
);

const Car =  mongoose.model("cars", carSchema);
module.exports = Car;
