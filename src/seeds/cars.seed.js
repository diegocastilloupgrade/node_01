const mongoose = require('mongoose');
const dotenv = require("dotenv");
const Car = require('../api/models/cars.model');
dotenv.config()

const cars = [
  {
    model: 'A4',
    year: 1999,
    brand: 'Audi',
    doors: 4,
    picture: 'https://cdn.worldvectorlogo.com/logos/real-madrid-c-f.svg',
  },
  {
    model: 'Serie C',
    year: 1958,
    brand: 'Mercedes',
    doors: 5,
    picture: 'https://cdn.worldvectorlogo.com/logos/fc-barcelona.svg',
  },
  {
    model: '320',
    year: 1958,
    brand:'BMW',
    doors: 3,
    picture: 'https://cdn.worldvectorlogo.com/logos/athletic-club-madrid.svg',
  },
];


const carsDocuments = cars.map((car) => Car(car));

mongoose
  .connect("mongodb+srv://diegocastillo:xvIYFJFTAvBNrbGv@cluster0.g4eqa.mongodb.net/mongocars?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allCars = await Car.find();
    if (allCars.length) {
      await Car.collection.drop();
      console.log("Cars DB deleted")
    }
  })
  .catch((error) => console.log('Error deleting cars', error))
  .then(async () => {
    await Car.insertMany(carsDocuments);
    console.log("Cars DB created")
  })
  .catch((error) => console.log('Error creating Cars', error))
  .finally(() => mongoose.disconnect());