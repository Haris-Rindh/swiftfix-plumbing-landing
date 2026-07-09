const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');
const Lead = require('./models/Lead');
const User = require('./models/User');
const { protect } = require('./middleware/authMiddleware');
const { sendLeadNotification } = require('./config/email');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB().then(() => {
  // Seed Default Admin User
  seedAdminUser();
});

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Seed Admin Logic
const seedAdminUser = async () => {
  try {
    const adminCount = await User.countDocuments();
    if (adminCount === 0) {
      console.log('[Seeding] Seeding admin database with default credentials...');
      const defaultEmail = 'admin@swiftfix.com';
      const defaultPassword = 'admin12345';
      
      await User.create({
        email: defaultEmail,
        password: defaultPassword
      });
      
      console.log(`[Seeding] Seeding COMPLETE!\n  Default Admin Account: ${defaultEmail}\n  Default Password: ${defaultPassword}\n  (Please modify these in production)`);
    } else {
      console.log('[Seeding] Admin user records exist. Skipping default seeding.');
    }
  } catch (error) {
    console.error('[Seeding] Error seeding admin credentials: ', error.message);
  }
};

// --- AUTH ROUTES ---

// @desc    Auth user & get token
// @route   POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }

    // Find user by email and select password field (since it is hidden by default)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    // Verify password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'fallback_jwt_secret',
      { expiresIn: '30d' }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error: ' + error.message });
  }
});


// --- LEADS ROUTES ---

// @desc    Get all leads (PROTECTED)
// @route   GET /api/leads
app.get('/api/leads', protect, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error: ' + error.message });
  }
});

// @desc    Create a new lead (PUBLIC)
// @route   POST /api/leads
app.post('/api/leads', async (req, res) => {
  try {
    const { name, phone, issue, estimateMin, estimateMax, details } = req.body;

    if (!name || !phone || !issue) {
      return res.status(400).json({ success: false, error: 'Please provide name, phone and issue' });
    }

    const lead = await Lead.create({ 
      name, 
      phone, 
      issue,
      estimateMin: estimateMin || 0,
      estimateMax: estimateMax || 0,
      details: details || ''
    });
    
    // Asynchronously send email notification to the business owner
    sendLeadNotification(lead);

    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error: ' + error.message });
  }
});

// @desc    Update a lead status (PROTECTED)
// @route   PUT /api/leads/:id
app.put('/api/leads/:id', protect, async (req, res) => {
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

// @desc    Delete a lead (PROTECTED)
// @route   DELETE /api/leads/:id
app.delete('/api/leads/:id', protect, async (req, res) => {
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
