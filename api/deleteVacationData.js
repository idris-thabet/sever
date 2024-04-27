const jwt = require('jsonwebtoken');
const Vacation = require('./../models/Vacation');
const User = require('./../models/User');

async function deleVacationData(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, "idristhabet");
    const userEmail = decodedToken.email;

    // Delete vacation data associated with the user
    await Vacation.deleteMany({ email: userEmail });

    res.status(200).json({ message: 'Vacation data deleted successfully' });
  } catch (error) {
    console.error('Error deleting vacation data:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = deleVacationData;
