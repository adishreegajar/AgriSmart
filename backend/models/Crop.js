import mongoose from 'mongoose';

const cropSchema = mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Farmer',
    },
    cropName: {
      type: String,
      required: [true, 'Please add a crop name'],
    },
    quantity: {
      type: String,
      required: [true, 'Please add a quantity'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please add a contact phone number'],
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
    },
    farmerName: {
      type: String,
      required: [true, 'Please add a farmer name'],
    },
    category: {
      type: String,
      enum: ['Cereals', 'Rice', 'Oilseeds', 'Cash Crops', 'Vegetables', 'Fruits', 'Other'],
      default: 'Other',
    },
    status: {
      type: String,
      enum: ['Available', 'Sold'],
      default: 'Available',
    },
    coordinates: {
      lat: { type: Number, default: 30.9010 }, // Default Ludhiana for demo
      lng: { type: Number, default: 75.8573 },
    },
  },
  {
    timestamps: true,
  }
);

const Crop = mongoose.model('Crop', cropSchema);
export default Crop;
