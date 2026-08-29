import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // [1] ලෙස වෙනස් විය

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next();
        }
        catch (error) {
            res.status(401).json({ message: "Invalid Token, Access Denied !!" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "User Not Found, Please Login Now !!" });
    }
}; // protect function එක මෙතනින් අවසන් වෙනවා

// admin function එක එළියෙන් වෙනම ලියන්න ඕනේ
export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(403).json({ message: "Permission Denied, Admin Only Access !!" });
    }
};