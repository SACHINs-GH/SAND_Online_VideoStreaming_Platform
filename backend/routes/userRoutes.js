import { Router } from "express";
import { User } from '../model/usermodel.js';
import { uploadCloudinary } from "../cloudinary.js";
import { upload } from '../multer.js';
import {verifyJWT} from '../verifyJWT.js'

const router = Router();


// 1.Register Route
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

//2.Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        //Validation :  Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required to log in." });
        }

        // check or find the user in the database
        const user = await User.findOne({ email });

        // If User not existed then tell user for registration
        if (!user) {
            return res.status(404).json({ message: "User not found. Please register first." });
        }
        // Validate Password if user existed
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Incorrect password. Please try again." });
        }
        // generate AccessToken and refresh Token
        const { accessToken, refreshToken } = await generateTokens(user._id);

        // logged in user
        const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

        const options = {
            httpOnly: true,
            secure:true
        };

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                user: loggedInUser,
                accessToken,
                refreshToken,
                message: "User logged in successfully."
            });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// 3. Logout Route
router.post("/logout", verifyJWT, async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
        );

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        };

        return res.status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({ message: "Successfully logged out. Come back soon!" });

    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;



