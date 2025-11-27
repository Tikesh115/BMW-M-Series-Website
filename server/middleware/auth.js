import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 1. Request hits /api/user/data
// 2. protect middleware runs first
// 3. If valid token → next() called → getUserData runs
// 4. If invalid token → next() NOT called → error response sent, getUserData never runs
export const protect = async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) {
        return res.json({success: false, message: "not authorized"});
    }
    try {
        const userId = jwt.decode(token, process.env.JWT_SECRET);
        if (!userId) {
            return res.json({success: false, message: "not authorized"});
        }
        req.user = await User.findById(userId).select("-password");
        next();
    } catch (error) {
        return res.json({success: false, message: "not authorized"});
    }
}