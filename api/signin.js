const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./../models/User');

async function signinUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      status: "ÉCHOUÉ",
      message: "Missing email or password"
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        status: "ÉCHOUÉ",
        message: "User not found"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        status: "ÉCHOUÉ",
        message: "Invalid password"
      });
    }

    const token = jwt.sign({ email: user.email }, 'idristhabet', { expiresIn: '365d' });

    // Check if the user is an admin
    if (user.isAdmin) {
      // If admin, return success status and token
      return res.json({
        status: "SUCCÈS_ADMIN",
        message: "Admin sign in successful",
        token: token,
      });
    } else {
      // If not admin, return success status and token
      return res.json({
        status: "SUCCÈS",
        message: "User sign in successful",
        token: token,
      });
    }
  } catch (error) {
    console.error('Error signing in user:', error);
    return res.json({
      status: "ÉCHOUÉ",
      message: "Server error"
    });
  }
}

module.exports = signinUser;
