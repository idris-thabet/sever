// const jwt = require('jsonwebtoken');
// const Vacation = require('./../models/Vacation');
// const User = require('./../models/User');

// async function updateVacationRequest(req, res) {
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(401).json({ message: 'التوكن غير موجود' });
//     }

//     try {
//         const decodedToken = jwt.verify(
//             token.replace(/^Bearer\s/, ""),
//             "idristhabet"
//         );
//         const userEmail = decodedToken.email;

//         // العثور على المستخدم بناءً على البريد الإلكتروني المتحمل من التوكن
//         const user = await User.findOne({ email: userEmail });
//         if (!user) {
//             return res.status(404).json({ message: 'المستخدم غير موجود' });
//         }

//         // التحقق مما إذا كان المستخدم مسؤولًا
//         if (!user.isAdmin) {
//             return res.status(403).json({ message: 'غير مصرح: فقط المسؤولون يمكنهم الوصول إلى هذا المورد' });
//         }

//         const { email, response } = req.body;

//         // التحقق من صحة الرد
//         if (response !== 'accepted' && response !== 'rejected') {
//             return res.status(400).json({ message: 'يرجى تحديد استجابة صالحة (مقبولة أو مرفوضة)' });
//         }

//         // تحديث حالة الطلب بناءً على الرد
//         const updatedVacation = await Vacation.findOneAndUpdate(
//             { "createdBy.email": email },
//             { response },
//             { new: true }
//         );

//         if (!updatedVacation) {
//             return res.status(404).json({ message: 'الطلب غير موجود' });
//         }

//         res.status(200).json({ message: `تم تحديث حالة الطلب بنجاح إلى ${response}` });
//     } catch (error) {
//         console.error('خطأ في معالجة طلب الإجازة:', error);
//         res.status(500).json({ error: 'خطأ في الخادم' });
//     }
// }

// module.exports = updateVacationRequest;


// updateVacationRequest.js
// updateVacationRequest.js
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
