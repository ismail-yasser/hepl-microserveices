const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup logic
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

// Login user and generate JWT token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Error during login');
  }
};

// Get user profile logic
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    res.status(500).send('Error fetching user profile');
  }
};

// Get current logged-in user's profile
exports.getCurrentUser = async (req, res) => {
  try {
    // req.user.id is added by the authMiddleware
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user); // Send back all user details except password
  } catch (error) {
    console.error('Error fetching current user profile:', error);
    res.status(500).send('Error fetching user profile');
  }
};

// Get all user profiles - for matching and discovery
exports.getAllUserProfiles = async (req, res) => {
  try {
    // Fetch all users, excluding sensitive information like passwords
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching all user profiles:', error);
    res.status(500).send('Error fetching user profiles');
  }
};
