import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { programsData } from './data/programsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure data directory and storage files exist
const dataDir = path.join(__dirname, 'data');
const inquiriesFile = path.join(dataDir, 'inquiries.json');
const volunteersFile = path.join(dataDir, 'volunteers.json');

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

// Programs Endpoint (with filter & search)
app.get('/api/programs', (req, res) => {
  const { search, donor, upazila } = req.query;
  let results = [...programsData];

  if (search) {
    const q = search.toString().toLowerCase();
    results = results.filter(p =>
      p.title.toLowerCase().includes(q) ||
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

  res.json({
    total: results.length,
    programs: results
  });
});

// Contact Submission API
app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Name, email, and message are required fields."
    });
  }

  const inquiries = readJSONFile(inquiriesFile);
  const newInquiry = {
    id: 'INQ-' + Date.now(),
    name,
    email,
    phone: phone || 'N/A',
    subject: subject || 'General Inquiry',
    message,
    status: 'Unread',
    submittedAt: new Date().toISOString()
  };

  inquiries.unshift(newInquiry);
  writeJSONFile(inquiriesFile, inquiries);

  res.status(201).json({
    success: true,
    message: "Thank you for reaching out to ASC. Your message has been received!",
    inquiryId: newInquiry.id
  });
});

// Volunteer / Support Request API
app.post('/api/volunteer', (req, res) => {
  const { fullName, email, phone, address, skills, interestArea, note } = req.body;

  if (!fullName || !email || !phone) {
    return res.status(400).json({
      success: false,
      error: "Full Name, Email, and Phone number are required."
    });
  }

  const volunteers = readJSONFile(volunteersFile);
  const newVolunteer = {
    id: 'VOL-' + Date.now(),
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

  volunteers.unshift(newVolunteer);
  writeJSONFile(volunteersFile, volunteers);

  res.status(201).json({
    success: true,
    message: "Your application to support Assistance for Safe Community (ASC) was submitted successfully!",
    volunteerId: newVolunteer.id
  });
});

// Admin APIs for ASC Management
app.get('/api/admin/inquiries', (req, res) => {
  const inquiries = readJSONFile(inquiriesFile);
  res.json({ total: inquiries.length, inquiries });
});

app.get('/api/admin/volunteers', (req, res) => {
  const volunteers = readJSONFile(volunteersFile);
  res.json({ total: volunteers.length, volunteers });
});

app.delete('/api/admin/inquiries/:id', (req, res) => {
  const { id } = req.params;
  let inquiries = readJSONFile(inquiriesFile);
  inquiries = inquiries.filter(item => item.id !== id);
  writeJSONFile(inquiriesFile, inquiries);
  res.json({ success: true, message: `Inquiry ${id} deleted.` });
});

app.delete('/api/admin/volunteers/:id', (req, res) => {
  const { id } = req.params;
  let volunteers = readJSONFile(volunteersFile);
  volunteers = volunteers.filter(item => item.id !== id);
  writeJSONFile(volunteersFile, volunteers);
  res.json({ success: true, message: `Volunteer record ${id} deleted.` });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
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
