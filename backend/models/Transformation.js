import mongoose from 'mongoose';

const transformationSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    originalImage: {
      type: String,
      required: true,
    },
    transformedImage: {
      type: String,
      required: true,
    },
    decorationElements: {
      type: Array,
      default: [],
    },
    transformationType: {
      type: String,
      enum: ['manual', 'ai'],
      default: 'manual',
    },
    theme: {
      type: String,
      default: 'Traditional Diwali',
    },
    intensity: {
      type: Number,
      default: 75,
    },
    prompt: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Transformation = mongoose.model('Transformation', transformationSchema);
export default Transformation;
