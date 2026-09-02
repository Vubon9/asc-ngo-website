import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, getIsConnected } from './db.js';
import { InquiryModel } from './models/Inquiry.js';
import { VolunteerModel } from './models/Volunteer.js';
import { DonationModel } from './models/Donation.js';
import { programsData } from './data/programsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Local File Data Storage Setup (Fallback)
const dataDir = path.join(__dirname, 'data');
const inquiriesFile = path.join(dataDir, 'inquiries.json');
const volunteersFile = path.join(dataDir, 'volunteers.json');
const donationsFile = path.join(dataDir, 'donations.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

function readJSONFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
}

function writeJSONFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// REST API Endpoints

// Organization Profile Info API
app.get('/api/info', (req, res) => {
  res.json({
    name: "Assistance for Safe Community (ASC)",
    shortName: "ASC",
    legalEntity: "Not-for-Profit Organization (NGO)",
    formationDate: "2001-12-01",
    database: getIsConnected() ? "MongoDB Atlas / Mongoose" : "Local JSON Storage (Fallback)",
    registrations: [
      {
        authority: "Directorate of Social Services, Govt of Bangladesh",
        regNumber: "DSS-Cox-228/03",
        date: "2003-01-04"
      },
      {
        authority: "Department of Youth Development, Govt of Bangladesh",
        regNumber: "Cox-151/09",
        date: "2009-11-06"
      }
    ],
    address: {
      primary: "Thana-Center, Bharamuhuri, Chakaria Municipality, Cox's Bazar",
      secondary: "Court Road, Chiringa C.C, Chakaria, Cox's Bazar",
      postCode: "Chiringa-C.C 4741"
    },
    contact: {
      chiefExecutive: "Mohammad Nazmus Salam Tahi",
      cellPhone: ["01819-861950", "01819-396400"],
      telephone: "03422-56488",
      email: ["asc.org.bd@gmail.com", "numanchakaria@gmail.com"]
    },
    coverageArea: "Chakaria, Pekua, Kutubdia, Moheskhali (Cox's Bazar) & Lama (Bandarban)"
  });
});

// Programs Endpoint (with filter, search, & SDG tags)
app.get('/api/programs', (req, res) => {
  const { search, donor, upazila, sdg } = req.query;
  let results = [...programsData];

  if (search) {
    const q = search.toString().toLowerCase();
    results = results.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.titleBn && p.titleBn.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.upazila.toLowerCase().includes(q)
    );
  }

  if (donor) {
    results = results.filter(p => p.donor.toLowerCase().includes(donor.toString().toLowerCase()));
  }

  if (upazila) {
    results = results.filter(p => p.upazila.toLowerCase().includes(upazila.toString().toLowerCase()));
  }

  if (sdg) {
    results = results.filter(p => p.sdgs && p.sdgs.includes(sdg.toString()));
  }

  res.json({
    total: results.length,
    programs: results
  });
});

// Contact Submission API (MongoDB + JSON Fallback)
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Name, email, and message are required fields."
    });
  }

  const inquiryId = 'INQ-' + Date.now();
  const inquiryData = {
    inquiryId,
    name,
    email,
    phone: phone || 'N/A',
    subject: subject || 'General Inquiry',
    message,
    status: 'Unread',
    submittedAt: new Date().toISOString()
  };

  try {
    if (getIsConnected()) {
      await InquiryModel.create(inquiryData);
    } else {
      const inquiries = readJSONFile(inquiriesFile);
      inquiries.unshift({ id: inquiryId, ...inquiryData });
      writeJSONFile(inquiriesFile, inquiries);
    }

    res.status(201).json({
      success: true,
      message: "Thank you for reaching out to ASC. Your message has been received!",
      inquiryId
    });
  } catch (err) {
    console.error("Error saving inquiry:", err);
    res.status(500).json({ success: false, error: "Internal database error." });
  }
});

// Volunteer Application API (MongoDB + JSON Fallback)
app.post('/api/volunteer', async (req, res) => {
  const { fullName, email, phone, address, skills, interestArea, note } = req.body;

  if (!fullName || !email || !phone) {
    return res.status(400).json({
      success: false,
      error: "Full Name, Email, and Phone number are required."
    });
  }

  const volunteerId = 'VOL-' + Date.now();
  const volunteerData = {
    volunteerId,
    fullName,
    email,
    phone,
    address: address || 'N/A',
    skills: skills || 'General Assistance',
    interestArea: interestArea || 'Education & Disaster Management',
    note: note || '',
    status: 'Pending Review',
    appliedAt: new Date().toISOString()
  };

  try {
    if (getIsConnected()) {
      await VolunteerModel.create(volunteerData);
    } else {
      const volunteers = readJSONFile(volunteersFile);
      volunteers.unshift({ id: volunteerId, ...volunteerData });
      writeJSONFile(volunteersFile, volunteers);
    }

    res.status(201).json({
      success: true,
      message: "Your application to support Assistance for Safe Community (ASC) was submitted successfully!",
      volunteerId
    });
  } catch (err) {
    console.error("Error saving volunteer:", err);
    res.status(500).json({ success: false, error: "Internal database error." });
  }
});

// Donation / Impact Support API (bKash, Nagad, Bank - MongoDB + JSON Fallback)
app.post('/api/donate', async (req, res) => {
  const { donorName, email, phone, amount, currency, paymentMethod, trxId, impactOption, note } = req.body;

  if (!donorName || !email || !amount) {
    return res.status(400).json({
      success: false,
      error: "Donor Name, Email, and Amount are required."
    });
  }

  const donationId = 'DON-' + Date.now();
  const donationData = {
    donationId,
    donorName,
    email,
    phone: phone || 'N/A',
    amount: Number(amount),
    currency: currency || 'BDT',
    paymentMethod: paymentMethod || 'bKash',
    trxId: trxId || 'N/A',
    impactOption: impactOption || 'General Support',
    note: note || '',
    status: 'Received / Verified',
    donatedAt: new Date().toISOString()
  };

  try {
    if (getIsConnected()) {
      await DonationModel.create(donationData);
    } else {
      const donations = readJSONFile(donationsFile);
      donations.unshift({ id: donationId, ...donationData });
      writeJSONFile(donationsFile, donations);
    }

    res.status(201).json({
      success: true,
      message: `Thank you ${donorName}! Your ${paymentMethod} donation of ${currency === 'USD' ? '$' : '৳'}${amount} has been recorded!`,
      donationId
    });
  } catch (err) {
    console.error("Error saving donation:", err);
    res.status(500).json({ success: false, error: "Internal database error." });
  }
});

// Admin APIs for ASC Management
app.get('/api/admin/inquiries', async (req, res) => {
  try {
    if (getIsConnected()) {
      const inquiries = await InquiryModel.find().sort({ submittedAt: -1 }).lean();
      const formatted = inquiries.map(i => ({ id: i.inquiryId || i._id, ...i }));
      res.json({ total: formatted.length, inquiries: formatted });
    } else {
      const inquiries = readJSONFile(inquiriesFile);
      res.json({ total: inquiries.length, inquiries });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/volunteers', async (req, res) => {
  try {
    if (getIsConnected()) {
      const volunteers = await VolunteerModel.find().sort({ appliedAt: -1 }).lean();
      const formatted = volunteers.map(v => ({ id: v.volunteerId || v._id, ...v }));
      res.json({ total: formatted.length, volunteers: formatted });
    } else {
      const volunteers = readJSONFile(volunteersFile);
      res.json({ total: volunteers.length, volunteers });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/donations', async (req, res) => {
  try {
    if (getIsConnected()) {
      const donations = await DonationModel.find().sort({ donatedAt: -1 }).lean();
      const formatted = donations.map(d => ({ id: d.donationId || d._id, ...d }));
      res.json({ total: formatted.length, donations: formatted });
    } else {
      const donations = readJSONFile(donationsFile);
      res.json({ total: donations.length, donations });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/inquiries/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (getIsConnected()) {
      await InquiryModel.deleteOne({ $or: [{ inquiryId: id }, { _id: id }] });
    }
    let inquiries = readJSONFile(inquiriesFile);
    inquiries = inquiries.filter(item => item.id !== id && item.inquiryId !== id);
    writeJSONFile(inquiriesFile, inquiries);
    res.json({ success: true, message: `Inquiry ${id} deleted.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/volunteers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (getIsConnected()) {
      await VolunteerModel.deleteOne({ $or: [{ volunteerId: id }, { _id: id }] });
    }
    let volunteers = readJSONFile(volunteersFile);
    volunteers = volunteers.filter(item => item.id !== id && item.volunteerId !== id);
    writeJSONFile(volunteersFile, volunteers);
    res.json({ success: true, message: `Volunteer record ${id} deleted.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/donations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (getIsConnected()) {
      await DonationModel.deleteOne({ $or: [{ donationId: id }, { _id: id }] });
    }
    let donations = readJSONFile(donationsFile);
    donations = donations.filter(item => item.id !== id && item.donationId !== id);
    writeJSONFile(donationsFile, donations);
    res.json({ success: true, message: `Donation record ${id} deleted.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Export Endpoint
app.get('/api/admin/export', async (req, res) => {
  try {
    let inquiries = [];
    let volunteers = [];
    let donations = [];

    if (getIsConnected()) {
      inquiries = await InquiryModel.find().lean();
      volunteers = await VolunteerModel.find().lean();
      donations = await DonationModel.find().lean();
    } else {
      inquiries = readJSONFile(inquiriesFile);
      volunteers = readJSONFile(volunteersFile);
      donations = readJSONFile(donationsFile);
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=asc-ngo-portal-export.json');
    res.json({
      exportedAt: new Date().toISOString(),
      organization: "Assistance for Safe Community (ASC)",
      databaseConnected: getIsConnected() ? "MongoDB Atlas" : "Local Storage",
      summary: {
        inquiriesCount: inquiries.length,
        volunteersCount: volunteers.length,
        donationsCount: donations.length
      },
      inquiries,
      volunteers,
      donations
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    database: getIsConnected() ? 'MongoDB Connected' : 'Local JSON Fallback',
    timestamp: new Date()
  });
});

// Serve frontend dist build in production
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`ASC NGO Backend Server running on http://localhost:${PORT}`);
});
