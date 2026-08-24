# Assistance for Safe Community (ASC) - NGO Official Website & REST Backend

This repository contains the complete full-stack website and management REST backend for **Assistance for Safe Community (ASC)**—a non-profit development organization based in Chakaria, Cox’s Bazar, Bangladesh.

---

## 🌟 Key Features

1. **Official Branding & Identity**:
   - ASC official logo, government registration IDs (`DSS-Cox-228/03` & `Cox-151/09`), and executive contact details.
   - Comprehensive sections covering Vision, Mission, Goals, and 4 Core Objectives.

2. **Filterable Program Portfolio**:
   - Dynamic catalog of all **12 ongoing donor-backed programs** (UNDP, BRAC, LGED, DAE, CARE Bangladesh, ASC Fund).
   - Instant filtering by **Upazila** (*Chakaria, Pekua, Kutubdia, Moheskhali, Lama*) and **Donor**.

3. **Strengths & Emergency Preparedness**:
   - Highlights community assets, including **300-family emergency Farma-tent disaster shelter capability**, staff fluency in **Chittagonian local dialect**, and membership in key Govt & Non-Govt committees.

4. **Leadership & Governance**:
   - Complete directory of Executive Committee members, Advisory Board (Dhaka Univ, ICDDR,B, BGC Trust Medical College), and Technical Advisors.

5. **Express REST API & Interactive Modals**:
   - `POST /api/contact`: Interactive contact form sending inquiries to backend.
   - `POST /api/volunteer`: Volunteer & donor partnership application form.
   - `GET /api/programs`: Search & query endpoint for ASC projects.
   - `GET /api/admin/inquiries` & `GET /api/admin/volunteers`: Executive Admin Portal (passcode protected: `asc2001`).

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Development
```bash
# 1. Install dependencies
npm install

# 2. Run both Express API Server (port 5001) & Vite React Frontend (port 5173) concurrently
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build & Server
```bash
# Build production bundle
npm run build

# Start production server (serves frontend build & API on port 5001)
npm start
```

---

## 📤 How to Push to Your GitHub Account

Run the following commands in your terminal:

```bash
# 1. Create a new repository on GitHub (e.g. named "asc-ngo-website")

# 2. Link your local repository to GitHub (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/asc-ngo-website.git

# 3. Push code to main branch
git branch -M main
git push -u origin main
```

---

## 🌐 How to Publish Publicly

### Option A: Deploy on Vercel (Recommended & Free)
1. Log in to [Vercel](https://vercel.com).
2. Click **"Add New Project"** and import your `asc-ngo-website` GitHub repository.
3. Click **"Deploy"**. Vercel will automatically build and host your website publicly with HTTPS!

### Option B: Deploy on Render / Railway (Fullstack with Node.js Backend)
1. Log in to [Render.com](https://render.com).
2. Create a new **Web Service** connected to your GitHub repo.
3. Set Build Command: `npm install && npm run build`
4. Set Start Command: `npm start`
5. Click **Deploy**. Render will host your Express API & React frontend live.
