
// signup.js
const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function signupUser(req, res) {
  const { username, email, number, password, isAdmin } = req.body;

  if (!username || !email || !password || !number || !isAdmin) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      number,
      isAdmin,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, "idristhabet", {
      expiresIn: "365d",
    });

    const message = "User signed up successfully";
    console.log(`${message}: ${username} (${email}) added to MongoDB`);
    res.status(201).json({ message, username, email, token });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = signupUser;
