import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donationId: { type: String, required: true, unique: true },
  donorName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: 'N/A' },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'BDT' },
  paymentMethod: { type: String, default: 'bKash' },
  trxId: { type: String, default: 'N/A' },
  impactOption: { type: String, default: 'General Support' },
  note: { type: String, default: '' },
  status: { type: String, default: 'Received / Verified' },
  donatedAt: { type: Date, default: Date.now }
});

export const DonationModel = mongoose.models.Donation || mongoose.model('Donation', donationSchema);
