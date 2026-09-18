// import express from 'express';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';
// import { protect } from '../middleware/auth.js';

// const router = express.Router();

// const generateToken = (id) => {
//   const secret = process.env.JWT_SECRET || 'fallback_jwt_secret_12345';
//   return jwt.sign({ id }, secret, { expiresIn: '7d' });
// };

// // Regex rules
// const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
// const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

// // @route   POST /api/auth/signup
// router.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'Please fill all fields' });
//     }

//     // Direct Gmail validation check
//     const normalizedEmail = email.toLowerCase().trim();
//     if (!GMAIL_REGEX.test(normalizedEmail)) {
//       return res.status(400).json({ 
//         message: 'Only valid @gmail.com addresses are allowed for signup' 
//       });
//     }

//     // Strong Password Regex validation
//     if (!PASSWORD_REGEX.test(password)) {
//       return res.status(400).json({ 
//         message: 'Password must be at least 6 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (@$!%*?&)' 
//       });
//     }

//     const existingUser = await User.findOne({ email: normalizedEmail });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists with this email' });
//     }

//     const user = await User.create({ name, email: normalizedEmail, password });

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id)
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // @route   POST /api/auth/login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Please provide email and password' });
//     }

//     const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id)
//     });
//   } catch (err) {
//     console.error("Login Route Error:", err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // @route   GET /api/auth/me
// router.get('/me', protect, async (req, res) => {
//   res.json({
//     _id: req.user._id,
//     name: req.user.name,
//     email: req.user.email
//   });
// });

// export default router;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';



const router = express.Router();


const otpStore = new Map();

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'fallback_jwt_secret_12345';
  return jwt.sign({ id }, secret, { expiresIn: '7d' });
};


const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
const EMAIL_USER = 'a.rehman1632@gmail.com'; 
const EMAIL_PASS = 'qwypuwqvgczpgseg'; 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

// @route   POST /api/auth/send-otp
router.post('/send-otp', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({
        message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (@$!%*?&)'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore.set(normalizedEmail, {
      name,
      password,
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000
    });

    await transporter.sendMail({
      from: `"Your App" <${EMAIL_USER}>`,
      to: normalizedEmail,
      subject: 'Email Verification Code',
      html: `<h3>Your Verification Code is: <b>${otp}</b></h3><p>This code will expire in 10 minutes.</p>`
    });

    res.json({ message: 'Verification OTP sent to your email' });
  } catch (err) {
    console.error("OTP Detailed Error:", err);
    res.status(500).json({ message: 'Failed to send verification code', error: err.message });
  }
});

// @route   POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    const record = otpStore.get(normalizedEmail);
    if (!record) {
      return res.status(400).json({ message: 'OTP expired or not requested' });
    }

    if (record.expiresAt < Date.now()) {
      otpStore.delete(normalizedEmail);
      return res.status(400).json({ message: 'OTP has expired. Request a new one.' });
    }

    if (record.otp !== otp.trim()) {
      return res.status(400).json({ message: 'Invalid OTP code' });
    }

    const user = await User.create({
      name: record.name,
      email: normalizedEmail,
      password: record.password
    });

    otpStore.delete(normalizedEmail);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// export default router;



// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  });
});

export default router;