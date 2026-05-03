import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const buyerSchema = mongoose.Schema(
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
    company: {
      type: String,
      required: [true, 'Please add a company name'],
    },
    role: {
      type: String,
      default: 'buyer',
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving to database
buyerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password with hashed password in database
buyerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Buyer = mongoose.model('Buyer', buyerSchema);
export default Buyer;
