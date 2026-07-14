# SwiftFix Plumbing - MERN Stack Lead Generation Application

SwiftFix Plumbing is a fully responsive plumbing services landing app built on the **MERN Stack** (MongoDB, Express, React, Node.js). Customers can use the interactive estimator to submit service inquiries, those leads are saved in MongoDB, and admins can log in to review, filter, update, and delete lead records from a dashboard.

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

## 🧩 Architecture at a Glance

- **Frontend (`frontend/`)**: React + Vite UI for the marketing landing page, estimate wizard, login page, and admin dashboard.
- **Backend (`backend/`)**: Express API for auth and lead CRUD endpoints.
- **Database (MongoDB)**: Stores users and lead submissions.
- **Runtime flow**: Frontend sends AJAX requests to backend endpoints (`/api/auth/*`, `/api/leads/*`), backend persists data in MongoDB, and protected routes require JWT auth.

---

## 🚀 Quick Start

### Prerequisites
Make sure you have:
- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (ships with Node.js)
- A running [MongoDB](https://www.mongodb.com/) instance (local or remote)

### 1) Install dependencies
From the repository root:
```bash
npm run install-all
```

### 2) Configure backend environment variables
Copy the example env file, then edit values as needed:
```bash
cp backend/.env.example backend/.env
```

Minimum required values for local development:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/swiftfix
JWT_SECRET=replace-with-a-long-random-secret
```

### 3) (Optional) Configure frontend API base URL
The frontend reads `VITE_API_URL` and defaults to same-origin (`''`) if unset.

For local split frontend/backend dev, create `frontend/.env` with:
```env
VITE_API_URL=http://localhost:5000
```

### 4) Start development servers
Start both backend and frontend together from the root:
```bash
npm run dev
```

You can also run them separately:
```bash
npm run server   # backend only (nodemon)
npm run client   # frontend only (Vite)
```

- React frontend: **[http://localhost:5173](http://localhost:5173)**
- Express backend: **[http://localhost:5000](http://localhost:5000)**
- Backend health check: **[http://localhost:5000/api/health](http://localhost:5000/api/health)**

## 🔐 Environment Variables Reference

### Backend (`backend/.env`)

| Variable | Required | Purpose |
| --- | --- | --- |
| `PORT` | No (defaults to `5000`) | Express server port |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | JWT signing secret for admin auth |
| `SMTP_HOST` | No | SMTP server host for lead notifications |
| `SMTP_PORT` | No | SMTP server port (defaults to `587`) |
| `SMTP_USER` | No | SMTP auth username |
| `SMTP_PASS` | No | SMTP auth password |
| `SMTP_FROM` | No | Sender email for lead notifications |
| `NOTIFY_EMAIL` | No | Inbox that receives lead notifications |

> If SMTP values are not provided, the backend auto-generates an Ethereal test mailbox in development.

### Frontend (`frontend/.env`)

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_API_URL` | No | Base URL for API requests. Use `http://localhost:5000` for local split dev. |

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