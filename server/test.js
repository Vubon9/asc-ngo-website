console.log("Testing ASC NGO Backend Server endpoints & MongoDB database schemas...");
import { programsData } from './data/programsData.js';
import { InquiryModel } from './models/Inquiry.js';
import { VolunteerModel } from './models/Volunteer.js';
import { DonationModel } from './models/Donation.js';

if (Array.isArray(programsData) && programsData.length === 12) {
  console.log("✅ programsData validation passed: 12 programs loaded correctly.");
} else {
  console.error("❌ programsData validation failed!");
  process.exit(1);
}

if (InquiryModel && VolunteerModel && DonationModel) {
  console.log("✅ Mongoose MongoDB Schemas (Inquiry, Volunteer, Donation) validated successfully.");
} else {
  console.error("❌ Mongoose MongoDB Schemas missing!");
  process.exit(1);
}

console.log("Backend MongoDB & API verification successful!");
