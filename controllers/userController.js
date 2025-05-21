const User = require('../models/User');
const bcrypt = require('bcrypt');
const session = require('express-session'); 

// Register controller
const registerUser = async (req, res) => {
    const { firstName, lastName, dob, gender, email, contactNumber, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !dob || !gender || !email || !contactNumber || !password || !confirmPassword) {
        return res.redirect('/registration?error=All fields are required');
    }

    if (password !== confirmPassword) {
        return res.redirect('/registration?error=Passwords do not match');
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.redirect('/registration?error=Email already registered');
        }

        const newUser = new User({
            firstName,
            lastName,
            dob,
            gender,
            email,
            contactNumber,
            password, 
        });

        await newUser.save();
        return res.redirect('/login?success=registered');
    } catch (error) {
        console.error('Registration Error:', error);
        return res.redirect('/registration?error=Server error');
    }
};

// Login controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.redirect('/login?error=All fields are required');
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.redirect('/login?error=Invalid email');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.redirect('/login?error=Invalid email or password');
    }

    req.session.userId = user._id;

    return res.redirect('/dashboard');
  } catch (error) {
    console.error('Login Error:', error);
    return res.redirect('/login?error=Server error');
  }
};

  

module.exports = {
    registerUser,
    loginUser,
};
