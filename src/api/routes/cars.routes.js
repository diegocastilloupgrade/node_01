const express = require('express');
const carsRouter = express.Router();
//Cloudinary
const upload = require('../../middlewares/file');
//Cloudinary

//Nos importamos las funciones que hemos creado en el controlador con un destructuring
const {
  getAllCars,
  getCarByID,
  getCarByModel,
  getCarByYear,
  postNewCar,
  deleteCar,
  patchCar,
} = require('../controllers/cars.controller.js');

//Defino las rutas del router
//router.metodo("endpoints", funcion);
//nos traemos la funcion getAllTems del controlador y la estamos ejecutando cuando entramos en la ruta '/'
carsRouter.get('/', getAllCars);
carsRouter.get('/id/:id', getCarByID);
carsRouter.get('/model/:model', getCarByModel);
carsRouter.get('/year/:year', getCarByYear);
//carsRouter.post('/', postNewCar);
carsRouter.post('/', upload.single("picture"), postNewCar);
carsRouter.delete('/:id', deleteCar);
//carsRouter.patch('/:id', patchCar);
carsRouter.patch('/:id', upload.single("picture"), patchCar);

//Exportamos el router
module.exports = carsRouter