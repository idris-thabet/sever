// signin.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./../models/User');

async function signinUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing email or password' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ email: user.email }, 'idristhabet', { expiresIn: '365d' });

    res.status(200).json({ message: 'Sign in successful', token });
  } catch (error) {
    console.error('Error signing in user:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = signinUser;
