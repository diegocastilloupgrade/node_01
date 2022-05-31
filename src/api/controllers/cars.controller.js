const { deleteFile } = require('../../middlewares/deleteFile');
const Car = require('../models/cars.model');

const getAllCars = async (req, res, next) => {
  try {
    const allCars = await Car.find();
    return res.status(200).json(allCars);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getCarByID = async (req, res, next) => {
  const id = req.params.id;
  try {
    const carByID = await Car.findById(id);
    return res.status(200).json(carByID);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getCarByModel = async (req, res, next) => {
  const model = req.params.model;
  try {
    const carByModel = await Car.findOne({ model: model });
    return res.status(200).json(carByModel);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getCarByYear = async (req, res, next) => {
  const year = req.params.year;
  try {
    const carByYear = await Car.find({ year: year });
    return res.status(200).json(carByYear);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const postNewCar = async (req, res, next) => {
  try {
    const newCar = new Car(req.body);
    //si en mi peticion me viene un archivo, cogemos la ruta y la metemos en .picture
    if(req.file) {
      newCar.picture = req.file.path;
    }
    const carDB = await newCar.save();
    return res.status(200).json(carDB);
  } catch (error) {
    return next(error);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const carDeleted = await Car.findByIdAndDelete(id)
    return res.status(200).json(carDeleted);
  } catch (error){
    return next(error)
  }
}

const patchCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patchCar = new Car(req.body);
    patchCar._id = id;
    const CarDB = await Car.findByIdAndUpdate(id, patchCar);
    //Si mi anterior CardDB.picture tiene una foto, entra y ejecuta la función de borrado.
    if (CarDB.picture){
      deleteFile(CarDB.picture);
    }
    //Comprueba si estoy metiendo una nueva y si es así, la mete
    if (req.file) {
      CardDB.picture = req.file.path;
    }
    if (!CardDB){
      return next(setError(404, "Info not found"));
    }
    return res.status(200).json({ nuevoCar: patchCar, viejoCar: CarDB})
  } catch (error) {
    
  }
}

module.exports = {
  getAllCars,
  getCarByID,
  getCarByModel,
  getCarByYear,
  postNewCar,
  deleteCar,
  patchCar
};
