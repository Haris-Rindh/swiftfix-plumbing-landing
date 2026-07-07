# SwiftFix Plumbing - MERN Stack Lead Generation Application

This is a fully responsive, high-performance plumbing services landing page migrated to the **MERN Stack** (MongoDB, Express, React, Node.js). It features a lead generation system that writes inquiries directly to MongoDB via an AJAX interface and provides a fully interactive admin dashboard to track and update lead statuses.

## 🌟 Key Features

- **MERN Stack Integration:** Real database submissions to MongoDB with an Express/Node.js backend REST API.
- **AJAX Submissions:** Async quote forms using Fetch API with loading states, error handling, and local storage state persistence.
- **Admin Dashboard:** Access leads on a dashboard to view client info, filter requests by status, update statuses, or delete records.
- **Modern Responsive Design:** Designed for mobile, tablet, and desktop views with a sticky emergency header.
- **Tailwind CSS v4:** Styled using Tailwind CSS v4's CSS-first config for high performance and clean styles.

---

## 🛠️ Project Structure

```
/
├── package.json           # Root scripts (starts dev environment)
├── backend/               # Node/Express API server
│   ├── config/db.js       # MongoDB Mongoose connector
│   ├── models/Lead.js     # Mongoose Lead schema
│   ├── server.js          # Express endpoints & server entry
│   └── .env               # Server environment configuration
└── frontend/              # Vite React client
    ├── src/
    │   ├── main.jsx       # Entry point
    │   ├── App.jsx        # Routing & layout assembly
    │   ├── index.css      # Tailwind v4 import & custom styles
    │   └── components/    # Landing Page & Dashboard components
    └── index.html         # HTML entry point with SEO metadata
```

---

## 🚀 How to Run

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and a running [MongoDB](https://www.mongodb.com/) instance installed.

### 1. Install Dependencies
Run this command in the root folder to install dependencies for the root, backend, and frontend directories:
```bash
npm run install-all
```

### 2. Configure Environment Variables
Create a `.env` file in the `backend/` directory (you can copy `backend/.env.example` as a template):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/swiftfix
```

### 3. Start Development Servers
Run the dev server in the root folder to start both Express backend and Vite React frontend concurrently:
```bash
npm run dev
```
The React frontend will be accessible at: **[http://localhost:5173](http://localhost:5173)**
The Express backend will be running on: **[http://localhost:5000](http://localhost:5000)**

---

## 📊 Admin Dashboard

To access the lead database tracking portal:
- Click the **"Admin View"** toggle button in the main desktop navbar.
- Alternatively, scroll to the footer and click the **"Toggle Admin Dashboard"** link.
- Or directly append `?admin=true` to the URL: **[http://localhost:5173/?admin=true](http://localhost:5173/?admin=true)**.

In the dashboard, you can:
- View stats (Total Leads, Pending Action, Resolved Services).
- Filter submissions by current state (All, Pending, In Contact, Scheduled, Resolved, Cancelled).
- Update a lead's status dynamically (syncs instantly back to MongoDB).
- Delete lead entries.