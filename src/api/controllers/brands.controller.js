const Brand = require('../models/brands.model');

const getAllBrands = async (req, res, next) => {
  try {
    const allBrands = await Brand.find().populate('cars');
    return res.json({ status: 200, message: 'Brands OK', brands: allBrands });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getBrandByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const brandByID = await Brand.findById(id);
    return res.json({
      status: 200,
      message: 'Brand OK',
      brand: brandByID,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getBrandByBrand = async (req, res, next) => {
  const brand = req.params.brand;
  try {
    const brandByBrand = await Brand.findOne({ brand: brand });
    return res.status(200).json(brandByBrand);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getBrandByYearOfFundation = async (req, res, next) => {
  const yearOfFundation = req.params.yearOfFundation;
  try {
    const brandByYearOfFundation = await Car.find({
      yearOfFundation: yearOfFundation,
    });
    return res.status(200).json(brandByYearOfFundation);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const postNewBrand = async (req, res, next) => {
  try {
    const newBrand = new Brand(req.body);
    const BrandDB = await newBrand.save();
    return res.status(200).json(BrandDB);
  } catch (error) {
    return next(error);
  }
};

const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brandDeleted = await Brand.findByIdAndDelete(id);
    return res.status(200).json(brandDeleted);
  } catch (error) {
    return next(error);
  }
};

const patchBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patchBrand = new Brand(req.body);
    patchbrand._id = id;
    const BrandDB = await Brand.findByIdAndUpdate(id, patchBrand);
    return res
      .status(200)
      .json({ nuevaBrand: patchBrand, viejaBrand: BrandDB });
  } catch (error) {}
};

module.exports = {
  getAllBrands,
  getBrandByID,
  getBrandByBrand,
  getBrandByYearOfFundation,
  postNewBrand,
  deleteBrand,
  patchBrand,
};
