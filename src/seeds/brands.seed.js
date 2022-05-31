const mongoose = require('mongoose');
const Brand = require('../api/models/brands.model.js');

const brands = [
  {
    brand: 'Audi',
    logo: 'https://cdn.worldvectorlogo.com/logos/real-madrid-c-f.svg',
    headquarters: 'Germany',
    yearOfFundation: 1999,
    web: 'www.audi.com',
  },
  {
    brand: 'Mercedes',
    logo: 'https://cdn.worldvectorlogo.com/logos/fc-barcelona.svg',
    headquarters: 'Germany',
    yearOfFundation: 1958,
    web: 'www.mercedes-benz.com',
  },
  {
    brand: 'BMW',
    logo: 'https://cdn.worldvectorlogo.com/logos/athletic-club-madrid.svg',
    headquarters: 'Germany',
    yearOfFundation: 1958,
    web: 'www.bmw.com',
  },
];

const brandsDocuments = brands.map((brand) => Brand(brand));

mongoose
  .connect(
    'mongodb+srv://diegocastillo:xvIYFJFTAvBNrbGv@cluster0.g4eqa.mongodb.net/mongocars?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(async () => {
    const allBrands = await Brand.find();
    if (allBrand.length) {
      await Brand.collection.drop();
      console.log('Brands DB deleted');
    }
  })
  .catch((error) => console.log('Error deleting brands', error))
  .then(async () => {
    await Brand.insertMany(brandsDocuments);
    console.log('Brands DB created');
  })
  .catch((error) => console.log('Error creating brands', error))
  .finally(() => mongoose.disconnect());
