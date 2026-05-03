import mongoose from 'mongoose';

const governmentSchemeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a scheme name'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    eligibility: {
      type: String,
      required: [true, 'Please add eligibility details'],
    },
    benefits: {
      type: String,
      required: [true, 'Please add benefit details'],
    },
    deadline: {
      type: String,
      required: [true, 'Please add a deadline'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    documentRequired: {
      type: String,
      required: [true, 'Please add document requirements'],
    },
  },
  {
    timestamps: true,
  }
);

const GovernmentScheme = mongoose.model('GovernmentScheme', governmentSchemeSchema);
export default GovernmentScheme;
