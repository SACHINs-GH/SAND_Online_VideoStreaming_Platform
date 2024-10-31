import { Router } from "express";
import { User } from '../model/usermodel.js';
import { uploadCloudinary } from "../cloudinary.js";
import { upload } from '../multer.js';
import {verifyJWT} from '../verifyJWT.js'
import { Subscription } from "../model/subscriptionmodel.js";
import { Video } from "../model/videoModel.js";
import { Playlist } from "../model/playlistmodel.js";
import {Comment} from "../model/commentmodel.js"

const router = Router();
// generate tokens
const generateTokens = async(userId)=>{
   try {
     const user = await User.findById(userId);
     if(!user){
         throw new Error("user not found");
     }
     const accessToken = await user.generateAccessToken ();
     const refreshToken = await user.generateRefreshToken();
     user.refreshToken = refreshToken;
     await user.save({ validateBeforeSave: false });
     return { accessToken, refreshToken };

   } catch (error) {
        console.error("Error generating tokens:", error);
        throw error; 
   }
}

// 1.Register Route
router.post("/register", upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }
]), async (req, res) => {
    try {
        const { channelname, firstname,lastname, password, email } = req.body;

        // Validation: Check if all fields are provided
        if (!channelname || !password || !email || !firstname || !lastname) {
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
            channelname,  
            fullname:firstname+" "+lastname,
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
        return res.status(200)
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .json({ message: "Successfully logged out. Come back soon!" });

    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

//4.delete channel
router.post("/deleteAccount", verifyJWT, async (req, res) => {
    try {
      const userId = req.user._id;
      await Subscription.deleteMany({ subscriber: userId });
      await Video.deleteMany({ owner: userId });
      await Playlist.deleteMany({ owner: userId });
      await Comment.deleteMany({ owner: userId });
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }
      const deletedUser = await User.deleteOne({ _id: userId });
      if (deletedUser.deletedCount === 0) {
        return res.status(400).json({ message: "Account deletion unsuccessful" });
      }
      return res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error during deletion" });
    }
  });
  
// 5. Upload Video Route
router.post("/uploadVideo", verifyJWT, upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 } 
]), async (req, res) => {
    try {
        const { title, description, type } = req.body;

        if (!title || !description || !type || !req.files?.videoFile || !req.files.videoFile[0] || !req.files?.thumbnail || !req.files.thumbnail[0]) {
            return res.status(400).json({ message: "All fields are required including video and thumbnail." });
        }

        let videoUrl = "";
        try {
            const video = await uploadCloudinary(req.files.videoFile[0].path);
            videoUrl = video?.url;
        } catch (uploadError) {
            console.error("Video Upload Error:", uploadError);
            return res.status(500).json({ message: "Error uploading video." });
        }

        let thumbnailUrl = "";
        try {
            const thumbnail = await uploadCloudinary(req.files.thumbnail[0].path);
            thumbnailUrl = thumbnail?.url;
        } catch (uploadError) {
            console.error("Thumbnail Upload Error:", uploadError);
            return res.status(500).json({ message: "Error uploading thumbnail." });
        }
        const video = await Video.create({
            videoFile: videoUrl,
            thumbnail: thumbnailUrl,
            type,
            title,
            description,
            owner: req.user._id
        });

        return res.status(201).json({ message: "Video uploaded successfully.", video });

    } catch (error) {
        console.error("Video Upload Error:", error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
});

export default router;



