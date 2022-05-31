const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const brandsSchema = new Schema(
  {
    brand: { type: String, required: true },
    logo: { type: String, required: true },
    headquarters: { type: String, required: true },
    yearOfFundation: { type: Number, required: false },
    web: { type: String, required: false },
    cars: [{ type: Schema.Types.ObjectId, ref: "cars", required: false }]

  },
  { timestamps: true }
);

const brand = mongoose.model('brands', brandsSchema);
module.exports = brand;
