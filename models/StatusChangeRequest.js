// models/StatusChangeRequest.js
import mongoose from 'mongoose';

const statusChangeRequestSchema = new mongoose.Schema({
  subTaskId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubTask', required: true },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  requestedStatus: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('StatusChangeRequest', statusChangeRequestSchema);
