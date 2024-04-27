const jwt = require('jsonwebtoken');
const Vacation = require('./../models/Vacation');
const User = require('./../models/User');

async function updateVacationRequest(req, res) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    const decodedToken = jwt.verify(
      token.replace(/^Bearer\s/, ""),
      "idristhabet"
    );
    const userEmail = decodedToken.email;

    // Check if user is an admin
    const user = await User.findOne({ email: userEmail });

    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized: User is not an admin' });
    }

    const { email, response } = req.body;

    // Check if the provided response is valid
    if (!['accepted', 'rejected', 'pending'].includes(response)) {
      return res.status(400).json({ message: 'Invalid response. Response must be one of: accepted, rejected, pending' });
    }

    // Find the vacation request by the user's email and update its response
    const updatedVacation = await Vacation.findOneAndUpdate({ email }, { response }, { new: true });

    if (!updatedVacation) {
      return res.status(404).json({ message: 'Vacation request not found for the specified user email' });
    }

    res.status(200).json({ message: 'Vacation request updated successfully', updatedVacation });
  } catch (error) {
    console.error('Error updating vacation request:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = updateVacationRequest;
