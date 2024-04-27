// const jwt = require('jsonwebtoken');
// const Vacation = require('./../models/Vacation');
// const User = require('./../models/User');

// async function getResponse(req, res) {
//     // Get the GET request
//     const token = req.headers.authorization;

//     // Check if the token exists
//     if (!token) {
//         return res.status(401).json({ message: 'Token not found' });
//     }

//     try {
//         const decodedToken = jwt.verify(
//             token.replace(/^Bearer\s/, ""),
//             "idristhabet"
//         );
//         const userEmail = decodedToken.email;

//         // Find the user based on the email extracted from the token
//         const user = await User.findOne({ email: userEmail });
       
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Retrieve responses (accepted or rejected) for vacation requests
//         const responses = await Vacation.find({
//             email: userEmail,
//             response: { $in: ['accepted', 'rejected'] }
//         }).select('response -_id'); // Select only the 'response' field and exclude the document ID

//         // Extract only the response values
//         const responseValues = responses.map(response => response.response);

//         return res.status(200).json({ responses: responseValues,userEmail });
//     } catch (error) {
//         console.error('Error fetching vacation requests:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// }

// module.exports = getResponse;


const jwt = require('jsonwebtoken');
const Vacation = require('./../models/Vacation');
const User = require('./../models/User');

async function getResponse(req, res) {
    // Get the Authorization header
    const authHeader = req.headers.authorization;

    // Check if the token exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, "idristhabet");
        const userEmail = decodedToken.email;

        // Find the user based on the email extracted from the token
        const user = await User.findOne({ email: userEmail });
       
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Retrieve responses (accepted or rejected) for vacation requests
        const responses = await Vacation.find({
            email: userEmail,
            response: { $in: ['accepted', 'rejected'] }
        }).select('response -_id'); // Select only the 'response' field and exclude the document ID

        // Extract only the response values
        const responseValues = responses.map(response => response.response);

        return res.status(200).json({ responses: responseValues, userEmail });
    } catch (error) {
        console.error('Error fetching vacation requests:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = getResponse;

