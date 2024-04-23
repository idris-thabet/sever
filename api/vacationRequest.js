

// // vacationRequest.js
// const jwt = require('jsonwebtoken');
// const Vacation = require('./../models/Vacation');

// async function vacRequest(req, res) {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'Authorization token is missing' });
//   }

//   try {
//     const decodedToken = jwt.verify(
//       token.replace(/^Bearer\s/, ""),
//       "idristhabet"
//     );
//     const userEmail = decodedToken.email;

//     const { start, end, type } = req.body;
//     const newVacation = new Vacation({
//       start,
//       end,
//       type,
//       response : 'pending',
//       createdBy: {
//         email: userEmail
//       }
//     });

//     await newVacation.save();

//     res.status(201).json({ message: 'Vacation created successfully' });
//   } catch (error) {
//     console.error('Error posting vacation:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// }

// module.exports = vacRequest;

// vacationRequest.js


// vacationRequest.js
const jwt = require('jsonwebtoken');
const Vacation = require('./../models/Vacation');
const User = require('./../models/User');

async function vacRequest(req, res) {
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

    // Retrieve user information based on email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { start, end, type } = req.body;
    
    // Create new vacation request with user information
    const newVacation = new Vacation({
      start,
      end,
      type,
      response: 'pending',
      username: user.username,
      email: user.email,
      createdBy: {
        email: userEmail
      }
    });

    await newVacation.save();

    res.status(201).json({ message: 'Vacation created successfully' });
  } catch (error) {
    console.error('Error posting vacation:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = vacRequest;

