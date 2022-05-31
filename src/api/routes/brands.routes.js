const express = require('express');
const brandsRouter = express.Router();

const {
  getAllBrands,
  getBrandByID,
  getBrandByBrand,
  getBrandByYearOfFundation,
  postNewBrand,
  deleteBrand,
  patchBrand,
} = require('../controllers/brands.controller.js');

//Defino las rutas del router
//router.metodo("endpoints", funcion);
//nos traemos la funcion getAllTems del controlador y la estamos ejecutando cuando entramos en la ruta '/'
brandsRouter.get('/', getAllBrands);
brandsRouter.get('/id/:id', getBrandByID);
brandsRouter.get('/brand/:brand', getBrandByBrand);
brandsRouter.get('/yearOfFundation/:yearOfFundation', getBrandByYearOfFundation);
brandsRouter.post('/', postNewBrand);
brandsRouter.delete('/:id', deleteBrand);
brandsRouter.patch('/:id', patchBrand);

//Exportamos el router
module.exports = brandsRouter