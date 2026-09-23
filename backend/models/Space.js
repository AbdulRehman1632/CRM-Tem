import mongoose from 'mongoose';

const spaceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    color: { type: String, default: '#7B68EE' },
    // Space ke apne custom columns (ClickUp style statuses)
    columns: [
      {
        id: { type: String, required: true },
        label: { type: String, required: true },
        color: { type: String, default: '#A0A0B2' }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Space', spaceSchema);