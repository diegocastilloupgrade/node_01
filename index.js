const express = require('express');
const dotenv = require('dotenv');

const cors = require('cors');

//routers
const brandsRouter = require('./src/api/routes/brands.routes');
const carsRouter = require('./src/api/routes/cars.routes');
const { connect } = require('./src/utils/database');
const cloudinary = require('cloudinary').v2

dotenv.config();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));


connect();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

//CONFIGURAMOS LOS HEADERS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//CONFIGURAMOS LAS CORS (Aquí definimos quien puede hacer peticiones a mi servidor)
server.use(cors({
    origin: "*",
    credentials: true
}))


server.use('/cars', carsRouter)
server.use('/brands', brandsRouter);

const PORT = process.env.PORT || 5000;

//Escuchamos el servidor en el puerto deseado
server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
