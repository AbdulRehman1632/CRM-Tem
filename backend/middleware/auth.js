// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// export const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       token = req.headers.authorization.split(' ')[1];

//       const secret = process.env.JWT_SECRET || 'fallback_jwt_secret_12345';
//       const decoded = jwt.verify(token, secret);

//       req.user = await User.findById(decoded.id).select('-password');

//       if (!req.user) {
//         return res.status(401).json({ message: 'User not found' });
//       }

//       return next();
//     } catch (error) {
//       console.error('JWT Verification Error:', error.message);
//       return res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({ message: 'Not authorized, no token provided' });
//   }


// };



import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const secret = process.env.JWT_SECRET || 'fallback_jwt_secret_12345';
      const decoded = jwt.verify(token, secret);

      console.log('Decoded Payload:', decoded); 

      
      const userId = decoded.id || decoded._id || decoded.userId;

      req.user = await User.findById(userId).select('-password');

      if (!req.user) {
        console.log('User not found in DB for ID:', userId); 
        return res.status(401).json({ message: 'User not found' });
      }

      return next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};