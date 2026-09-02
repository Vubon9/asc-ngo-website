import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  volunteerId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, default: 'N/A' },
  skills: { type: String, default: 'General Assistance' },
  interestArea: { type: String, default: 'Education & Disaster Management' },
  note: { type: String, default: '' },
  status: { type: String, default: 'Pending Review' },
  appliedAt: { type: Date, default: Date.now }
});

export const VolunteerModel = mongoose.models.Volunteer || mongoose.model('Volunteer', volunteerSchema);
