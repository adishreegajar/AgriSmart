import Crop from '../models/Crop.js';

// @desc    Add a new crop
// @route   POST /api/crops
// @access  Private (Farmer)
export const addCrop = async (req, res) => {
  try {
    const { cropName, quantity, price, location, farmerName, category, phoneNumber } = req.body;

    if (!cropName || !quantity || !price || !location || !farmerName || !phoneNumber) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    const crop = await Crop.create({
      farmer: req.user._id,
      cropName,
      quantity,
      price,
      location,
      farmerName,
      category,
      phoneNumber,
    });

    res.status(201).json(crop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all crops (Marketplace)
// @route   GET /api/crops
// @access  Public
export const getAllCrops = async (req, res) => {
  try {
    const { cropName, location, category, minPrice, maxPrice } = req.query;
    
    let query = {};

    if (cropName) {
      query.cropName = { $regex: cropName, $options: 'i' };
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const crops = await Crop.find({ ...query, status: 'Available' }).sort({ createdAt: -1 });
    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Farmer's own crops
// @route   GET /api/crops/mycrops
// @access  Private (Farmer)
export const getMyCrops = async (req, res) => {
  try {
    const crops = await Crop.find({ farmer: req.user._id });
    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a crop
// @route   PUT /api/crops/:id
// @access  Private (Farmer)
export const updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    // Check if farmer owns the crop
    if (crop.farmer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedCrop = await Crop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedCrop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a crop
// @route   DELETE /api/crops/:id
// @access  Private (Farmer)
export const deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    // Check if farmer owns the crop
    if (crop.farmer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await crop.deleteOne();

    res.status(200).json({ message: 'Crop removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark a crop as sold
// @route   PATCH /api/crops/:id/sold
// @access  Private (Farmer)
export const markCropAsSold = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    // Check if farmer owns the crop
    if (crop.farmer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    crop.status = 'Sold';
    const updatedCrop = await crop.save();

    res.status(200).json(updatedCrop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
