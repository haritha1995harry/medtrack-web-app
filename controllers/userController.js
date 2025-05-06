const User = require('../models/User');
const bcrypt = require('bcrypt');

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

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      firstName,
      lastName,
      dob,
      gender,
      email,
      contactNumber,
      password: hashedPassword
    });

    await newUser.save();
    
    // Redirect to login with success message
    return res.redirect('/login?success=registered');
  } catch (error) {
    console.error('Registration Error:', error);
    return res.redirect('/registration?error=Server error');
  }
};


module.exports = {
  registerUser,
};
