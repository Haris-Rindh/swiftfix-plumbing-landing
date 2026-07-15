# SwiftFix Plumbing - MERN Stack Lead Generation Application

A fully responsive, high-performance plumbing services landing page built with the **MERN Stack** (MongoDB, Express, React, Node.js). Features a sophisticated lead generation system with an admin dashboard for managing client inquiries.

![Language Composition: JavaScript 95.5%, CSS 3.8%, HTML 0.7%](https://img.shields.io/badge/JavaScript-95.5%25-F7DF1E?style=flat) ![CSS](https://img.shields.io/badge/CSS-3.8%25-1572B6?style=flat) ![HTML](https://img.shields.io/badge/HTML-0.7%25-E34C26?style=flat)

---

## 🌟 Key Features

- **MERN Stack Integration**: Real database submissions to MongoDB with an Express/Node.js backend REST API
- **AJAX Submissions**: Async quote forms using Fetch API with loading states, error handling, and local storage state persistence
- **Admin Dashboard**: Comprehensive lead management portal to view client info, filter requests by status, update statuses, and delete records
- **Modern Responsive Design**: Optimized for mobile, tablet, and desktop views with sticky emergency header
- **Tailwind CSS v4**: Styled with Tailwind CSS v4's CSS-first config for high performance and clean, maintainable styles
- **Real-time Updates**: Lead status changes sync instantly back to MongoDB
- **SEO Optimized**: Full metadata and structured data for better search engine visibility

---

## 📋 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | Latest LTS | Runtime environment |
| **Express.js** | Latest | REST API & Backend server |
| **React** | Latest | Frontend UI framework |
| **MongoDB** | Latest | Database for lead storage |
| **Mongoose** | Latest | ODM for MongoDB |
| **Vite** | Latest | Frontend build tool |
| **Tailwind CSS** | v4 | Styling framework |

---

## 🛠️ Project Structure

```
/
├── package.json                 # Root scripts (starts dev environment)
├── backend/                     # Node/Express API server
│   ├── config/
│   │   └── db.js               # MongoDB Mongoose connector
│   ├── models/
│   │   └── Lead.js             # Mongoose Lead schema
│   ├── server.js               # Express endpoints & server entry
│   ├── .env                    # Server environment configuration
│   └── package.json            # Backend dependencies
└── frontend/                    # Vite React client
    ├── src/
    │   ├── main.jsx            # Entry point
    │   ├── App.jsx             # Routing & layout assembly
    │   ├── index.css           # Tailwind v4 import & custom styles
    │   ├── components/         # Landing Page & Dashboard components
    │   │   ├── LandingPage.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   └── ...
    │   └── utils/              # Utility functions
    ├── index.html              # HTML entry point with SEO metadata
    ├── vite.config.js          # Vite configuration
    └── package.json            # Frontend dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (running locally or cloud instance) - [MongoDB setup guide](https://www.mongodb.com/docs/manual/installation/)
- **npm** or **yarn** package manager

### 1. Clone & Setup

```bash
git clone https://github.com/Haris-Rindh/swiftfix-plumbing-landing.git
cd swiftfix-plumbing-landing
```

### 2. Install Dependencies

Run this command in the root folder to install dependencies for root, backend, and frontend:

```bash
npm run install-all
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend/` directory (you can copy `backend/.env.example` as a template):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/swiftfix
NODE_ENV=development
```

**For production**, update `MONGO_URI` with your MongoDB Atlas connection string.

### 4. Start Development Servers

Run the dev server in the root folder to start both Express backend and Vite React frontend concurrently:

```bash
npm run dev
```

**Local Access:**
- 🔵 React Frontend: **http://localhost:5173**
- 🟢 Express Backend: **http://localhost:5000**

---

## 📊 Admin Dashboard

### Access the Dashboard

Choose any of these methods:

1. **Toggle Button**: Click the **"Admin View"** button in the main desktop navbar
2. **Footer Link**: Scroll to the footer and click **"Toggle Admin Dashboard"**
3. **URL Parameter**: Append `?admin=true` to the frontend URL: **http://localhost:5173/?admin=true**

### Dashboard Features

- ✅ **Lead Statistics**: View total leads, pending actions, and resolved services
- 🔍 **Advanced Filtering**: Filter submissions by status:
  - All
  - Pending
  - In Contact
  - Scheduled
  - Resolved
  - Cancelled
- ✏️ **Update Status**: Change lead status dynamically (syncs instantly to MongoDB)
- 🗑️ **Delete Records**: Remove lead entries from the database
- 📊 **Real-time Sync**: All changes reflect immediately across the application

---

## 📝 API Endpoints

### Leads Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/leads` | Get all leads |
| `GET` | `/api/leads/:id` | Get a specific lead |
| `POST` | `/api/leads` | Create a new lead |
| `PUT` | `/api/leads/:id` | Update a lead |
| `DELETE` | `/api/leads/:id` | Delete a lead |

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "service": "Emergency Repair",
    "status": "pending"
  }'
```

---

## 🔧 Available Scripts

### Root Level Commands

```bash
# Install all dependencies
npm run install-all

# Start development environment (both frontend & backend)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Backend Specific

```bash
cd backend
npm start          # Start Express server
npm run dev        # Start with nodemon (auto-reload)
```

### Frontend Specific

```bash
cd frontend
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

---

## 🗄️ Database Schema

### Lead Model

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  phone: String (required),
  service: String,
  message: String,
  status: String (enum: ['pending', 'in-contact', 'scheduled', 'resolved', 'cancelled']),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## 🚢 Deployment

### Backend (Heroku, Railway, or Similar)

1. Push your code to GitHub
2. Connect your repository to your hosting platform
3. Set environment variables:
   - `PORT`: 5000
   - `MONGO_URI`: Your MongoDB Atlas connection string
4. Deploy!

### Frontend (Vercel, Netlify, or Similar)

1. Update the `frontend/.env.production` with your backend API URL
2. Push to GitHub
3. Connect your repository to Vercel/Netlify
4. Deploy!

---

## 🐛 Troubleshooting

### Issue: MongoDB Connection Failed

**Solution**: Ensure MongoDB is running locally or check your `MONGO_URI` in `.env`

```bash
# Check MongoDB status (macOS)
brew services list

# Start MongoDB (if not running)
brew services start mongodb-community
```

### Issue: Port 5000 or 5173 Already in Use

**Solution**: Kill the process or specify a different port:

```bash
# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: Modules Not Found

**Solution**: Clear node_modules and reinstall:

```bash
npm run install-all
# or manually:
rm -rf node_modules backend/node_modules frontend/node_modules
npm install
```

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For issues, questions, or suggestions, please open a GitHub Issue in this repository.

---

**Made with ❤️ by Haris Rindh**
