import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const farmerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
    },
    role: {
      type: String,
      default: 'farmer',
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

// Hash password before saving to database
farmerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password with hashed password in database
farmerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Farmer = mongoose.model('Farmer', farmerSchema);
export default Farmer;
