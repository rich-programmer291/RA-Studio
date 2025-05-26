import express from 'express';
import User from '../Models/userModel.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, password, securityQuestion, securityAnswer } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      username,
      password,
      securityQuestion,
      securityAnswer
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '10h',
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get security question route
router.post('/security-question', async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ securityQuestion: user.securityQuestion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Forgot password route
router.post('/forgot-password', async (req, res) => {
  const { username, securityAnswer, newPassword } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.matchSecurityAnswer(securityAnswer);
    if (!isMatch) {
      return res.status(400).json({ message: 'Security answer is incorrect' });
    }

    // Update the password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password has been reset successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
