import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  inquiryId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: 'N/A' },
  subject: { type: String, default: 'General Inquiry' },
  message: { type: String, required: true },
  status: { type: String, default: 'Unread' },
  submittedAt: { type: Date, default: Date.now }
});

export const InquiryModel = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
