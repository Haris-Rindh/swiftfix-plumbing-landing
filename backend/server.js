const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Lead = require('./models/Lead');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
// @desc    Get all leads
// @route   GET /api/leads
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error: ' + error.message });
  }
});

// @desc    Create a new lead
// @route   POST /api/leads
app.post('/api/leads', async (req, res) => {
  try {
    const { name, phone, issue } = req.body;

    if (!name || !phone || !issue) {
      return res.status(400).json({ success: false, error: 'Please provide name, phone and issue' });
    }

    const lead = await Lead.create({ name, phone, issue });
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error: ' + error.message });
  }
});

// @desc    Update a lead status
// @route   PUT /api/leads/:id
app.put('/api/leads/:id', async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, error: 'Please provide status' });
    }

    const validStatuses = ['Pending', 'In Contact', 'Scheduled', 'Resolved', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error: ' + error.message });
  }
});

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
app.delete('/api/leads/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error: ' + error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
