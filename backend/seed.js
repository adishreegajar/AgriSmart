import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Farmer from './models/Farmer.js';
import Crop from './models/Crop.js';

dotenv.config();

const MONGO_URI = "mongodb://127.0.0.1:27017/agrismart"; // Fallback to local
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const dummyCrops = [
  {
    cropName: 'Premium Wheat',
    quantity: '50 Quintals',
    price: 2300,
    phoneNumber: '+91 9876543210',
    location: 'Ludhiana, Punjab',
    farmerName: 'Ramesh Singh',
    category: 'Cereals',
    status: 'Available',
    coordinates: { lat: 30.9010, lng: 75.8573 }
  },
  {
    cropName: 'Basmati Rice',
    quantity: '25 Quintals',
    price: 4200,
    phoneNumber: '+91 9876543211',
    location: 'Karnal, Haryana',
    farmerName: 'Suresh Kumar',
    category: 'Rice',
    status: 'Available',
    coordinates: { lat: 29.6857, lng: 76.9905 }
  },
  {
    cropName: 'Red Onion',
    quantity: '100 Quintals',
    price: 1800,
    phoneNumber: '+91 9876543212',
    location: 'Nashik, Maharashtra',
    farmerName: 'Balasaheb Patil',
    category: 'Vegetables',
    status: 'Available',
    coordinates: { lat: 19.9975, lng: 73.7898 }
  },
  {
    cropName: 'Fresh Tomatoes',
    quantity: '30 Quintals',
    price: 2500,
    phoneNumber: '+91 9876543213',
    location: 'Kolar, Karnataka',
    farmerName: 'Hanumantha Rao',
    category: 'Vegetables',
    status: 'Available',
    coordinates: { lat: 13.1367, lng: 78.1292 }
  },
  {
    cropName: 'Soybean',
    quantity: '80 Quintals',
    price: 4700,
    phoneNumber: '+91 9876543214',
    location: 'Indore, Madhya Pradesh',
    farmerName: 'Mohan Sharma',
    category: 'Oilseeds',
    status: 'Available',
    coordinates: { lat: 22.7196, lng: 75.8577 }
  },
  {
    cropName: 'Cotton',
    quantity: '40 Quintals',
    price: 7000,
    phoneNumber: '+91 9876543215',
    location: 'Nagpur, Maharashtra',
    farmerName: 'Vikas Deshmukh',
    category: 'Cash Crops',
    status: 'Available',
    coordinates: { lat: 21.1458, lng: 79.0882 }
  },
  {
    cropName: 'Alphonso Mango',
    quantity: '10 Quintals',
    price: 15000,
    phoneNumber: '+91 9876543216',
    location: 'Ratnagiri, Maharashtra',
    farmerName: 'Prakash Kadam',
    category: 'Fruits',
    status: 'Available',
    coordinates: { lat: 16.9902, lng: 73.3120 }
  },
  {
    cropName: 'Sugarcane',
    quantity: '200 Tonnes',
    price: 3200,
    phoneNumber: '+91 9876543217',
    location: 'Kolhapur, Maharashtra',
    farmerName: 'Vinayak Shinde',
    category: 'Cash Crops',
    status: 'Available',
    coordinates: { lat: 16.7050, lng: 74.2433 }
  },
  {
    cropName: 'Turmeric',
    quantity: '15 Quintals',
    price: 8500,
    phoneNumber: '+91 9876543218',
    location: 'Erode, Tamil Nadu',
    farmerName: 'Karthikeyan',
    category: 'Cash Crops',
    status: 'Available',
    coordinates: { lat: 11.3410, lng: 77.7172 }
  },
  {
    cropName: 'Mustard Seeds',
    quantity: '45 Quintals',
    price: 5200,
    phoneNumber: '+91 9876543219',
    location: 'Jaipur, Rajasthan',
    farmerName: 'Rajendra Singh',
    category: 'Oilseeds',
    status: 'Available',
    coordinates: { lat: 26.9124, lng: 75.7873 }
  }
];

const seedData = async () => {
  try {
    await connectDB();
    
    // Check if farmer exists, otherwise create a dummy farmer
    let farmer = await Farmer.findOne();
    if (!farmer) {
      farmer = await Farmer.create({
        name: 'System Farmer',
        email: 'systemfarmer@example.com',
        password: 'password123',
        phone: '+91 0000000000',
        location: 'India'
      });
      console.log('Created dummy farmer');
    }

    const cropsWithFarmer = dummyCrops.map(crop => {
      return { ...crop, farmer: farmer._id };
    });

    await Crop.insertMany(cropsWithFarmer);
    
    console.log(`Inserted ${cropsWithFarmer.length} crops for Marketplace.`);
    process.exit();
  } catch (error) {
    console.error(`Error with data seed: ${error}`);
    process.exit(1);
  }
};

seedData();
