const jwt = require('jsonwebtoken');
const Vacation = require('./../models/Vacation');
const User = require('./../models/User');

async function getVacRequest(req, res) {
    const token = req.headers.authorization;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
        const decodedToken = jwt.verify(
            token.replace(/^Bearer\s/, ""),
            "idristhabet"
        );
        const userEmail = decodedToken.email;

        // Find user based on email extracted from token
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user is an admin
        if (user.isAdmin) {
            // If admin, retrieve all vacation requests with response pending
            const vacations = await Vacation.find({ response: 'pending' });
            return res.status(200).json({ vacations });
        } else {
            // If not admin
            return res.status(403).json({ message: 'Unauthorized: Only admins can access this resource' });
        }
    } catch (error) {
        console.error('Error fetching vacation requests:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = getVacRequest;



// const Vacation = require('./../models/Vacation');

// async function getVacRequest(req, res) {
//     try {
       
//         let vacations;
//         if(req.user && req.user.isAdmin) {
//             vacations = await Vacation.find();
//         } else {
//             vacations = await Vacation.find({ response: 'pending' });
//         }
//         return res.status(200).json({ vacations });
//     } catch (error) {
//         console.error('Error fetching vacation requests:', error);
//         res.status(500).json({ error: 'Server error'  });
//     }
// }

// module.exports = getVacRequest;


