import jwt from 'jsonwebtoken';
import Farmer from '../models/Farmer.js';
import Crop from '../models/Crop.js';

// @desc    Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new Farmer
// @route   POST /api/auth/signup
// @access  Public
export const registerFarmer = async (req, res) => {
  try {
    const { name, email, password, phone, location, role } = req.body;

    // Validation
    if (!name || !email || !password || !phone || !location) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if farmer exists
    const farmerExists = await Farmer.findOne({ email });
    if (farmerExists) {
      return res.status(400).json({ message: 'Farmer already exists' });
    }

    // Create farmer
    const farmer = await Farmer.create({
      name,
      email,
      password,
      phone,
      location,
      role: role || 'farmer'
    });

    if (farmer) {
      res.status(201).json({
        _id: farmer.id,
        name: farmer.name,
        email: farmer.email,
        phone: farmer.phone,
        location: farmer.location,
        token: generateToken(farmer._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid farmer data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate a Farmer
// @route   POST /api/auth/login
// @access  Public
export const loginFarmer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for farmer email
    const farmer = await Farmer.findOne({ email });

    if (farmer && (await farmer.matchPassword(password))) {
      res.json({
        _id: farmer.id,
        name: farmer.name,
        email: farmer.email,
        phone: farmer.phone,
        location: farmer.location,
        token: generateToken(farmer._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Farmer Profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.user._id);

    if (farmer) {
      const oldName = farmer.name;
      const oldPhone = farmer.phone;
      const oldLocation = farmer.location;

      farmer.name = req.body.name || farmer.name;
      farmer.phone = req.body.phone || farmer.phone;
      farmer.location = req.body.location || farmer.location;

      if (req.body.password) {
        farmer.password = req.body.password;
      }

      const updatedFarmer = await farmer.save();

      // Synchronize with existing Crop listings
      if (
        req.body.name !== oldName ||
        req.body.phone !== oldPhone ||
        req.body.location !== oldLocation
      ) {
        await Crop.updateMany(
          { farmer: farmer._id },
          {
            $set: {
              farmerName: updatedFarmer.name,
              phoneNumber: updatedFarmer.phone,
              location: updatedFarmer.location,
            },
          }
        );
      }

      res.json({
        _id: updatedFarmer._id,
        name: updatedFarmer.name,
        email: updatedFarmer.email,
        phone: updatedFarmer.phone,
        location: updatedFarmer.location,
        token: generateToken(updatedFarmer._id),
      });
    } else {
      res.status(404).json({ message: 'Farmer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current farmer data
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
