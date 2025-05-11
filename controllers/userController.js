const User = require('../models/User');
const bcrypt = require('bcrypt');

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
            password, // raw password - will be hashed in model
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
  
    // Check for missing fields
    if (!email || !password) {
      return res.redirect('/login?error=All fields are required');
    }
  
    try {
      const user = await User.findOne({ email });
  
      // Check if user exists
      if (!user) {
        return res.redirect('/login?error=Invalid email or password');
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.redirect('/login?error=Invalid email or password');
      }
  
      // Save session (if using express-session)
      req.session.userId = user._id;
  
      // Redirect to dashboard
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
