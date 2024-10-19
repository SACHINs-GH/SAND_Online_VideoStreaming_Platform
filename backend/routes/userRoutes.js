import { Router } from "express";
import { User } from '../model/usermodel.js';
import { uploadCloudinary } from "../cloudinary.js";
import { upload } from '../multer.js';

const router = Router();

router.post("/register", upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }
]), async (req, res) => {
    try {
        const { username, fullname, password, email } = req.body;

        // Validation: Check if all fields are provided
        if (!username || !password || !email || !fullname) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if user already exists
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(409).json({ message: "User already exists." });
        }

        // Avatar upload validation
        if (!req.files?.avatar || !req.files.avatar[0]) {
            return res.status(400).json({ message: "Avatar required." });
        }

        // Upload avatar to cloudinary
        let avatarUrl = "";
        try {
            const avatar = await uploadCloudinary(req.files.avatar[0].path);
            avatarUrl = avatar?.url;
        } catch (uploadError) {
            console.error("Avatar Upload Error:", uploadError);
            return res.status(500).json({ message: "Error uploading avatar." });
        }

        // Create user
        const user = await User.create({
            username,  
            fullname,
            password,  
            email,
            avatar: avatarUrl,
        });

        // Select the user without sensitive fields
        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        if (!createdUser) {
            return res.status(500).json({ message: "Server error during registration. Try again later." });
        }

        return res.status(201).json({ message: "User registered successfully.", user: createdUser });

    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
});

export default router;
