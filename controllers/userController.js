const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  const { firstName, lastName, dob, gender, email, contactNumber, password, confirmPassword } = req.body;

 
  if (!firstName || !lastName || !dob || !gender || !email || !contactNumber || !password || !confirmPassword) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match.' });
  }

  // TODO: Add email format and password strength validation if needed

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered.' });
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

    return res.status(201).json({ success: true, message: 'User registered successfully.' });

  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ success: false, message: error});
  }
};

module.exports = {
  registerUser,
};
