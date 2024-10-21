// middleWare/verifyUser.js
import jwt from "jsonwebtoken";
import { User } from './model/usermodel.js'

export const verifyJWT = async (req, res, next) => {
    try {
        console.log(req.cookies)
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decodedToken)
        const user = await User.findById(decodedToken.id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
};
