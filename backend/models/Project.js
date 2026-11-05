import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    projectName: {
      type: String,
      required: [true, 'Please provide a project name'],
      default: 'My Diwali Living Room',
      trim: true,
    },
    roomType: {
      type: String,
      enum: ['Living Room', 'Bedroom', 'Balcony', 'Main Entrance', 'Pooja Room', 'Outdoor Space', 'Other'],
      default: 'Living Room',
    },
    originalImage: {
      type: String,
      required: [true, 'Original room image is required'],
    },
    selectedTheme: {
      type: String,
      enum: [
        'Traditional Diwali',
        'Royal Diwali',
        'Modern Minimalist',
        'Eco-Friendly Diwali',
        'Luxury Celebration',
        'Custom',
      ],
      default: 'Traditional Diwali',
    },
    canvasState: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    previewImage: {
      type: String,
      default: '',
    },
    decorationsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
