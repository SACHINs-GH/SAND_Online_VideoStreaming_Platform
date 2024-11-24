import { Router } from "express";
import { User } from '../model/usermodel.js';
import { uploadCloudinary, cloudinary } from "../cloudinary.js";
import { upload } from '../multer.js';
import { verifyJWT } from '../verifyJWT.js'
import { Video } from "../model/videoModel.js";
import { Comment } from "../model/commentmodel.js"
import ffmpeg from "fluent-ffmpeg";

const router = Router();
// generate tokens
const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("user not found");
        }
        const accessToken = await user.generateAccessToken();
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
router.post(
    "/register",
    upload.fields([{ name: "avatar", maxCount: 1 }]),
    async (req, res) => {
        try {
            const { channelname, firstname, lastname, password, email } = req.body;
            if (!channelname || !firstname || !lastname || !password || !email) {
                return res.status(400).json({ message: "All fields are required." });
            }
            const existedUser = await User.findOne({ email });
            if (existedUser) {
                return res.status(409).json({ message: "User already exists." });
            }
            if (!req.files?.avatar || !req.files.avatar[0]) {
                return res.status(400).json({ message: "Avatar file is required." });
            }
            let avatarUrl;
            try {
                const avatarUploadResult = await uploadCloudinary(req.files.avatar[0].path);
                if (!avatarUploadResult?.url) {
                    return res.status(500).json({ message: "Failed to upload avatar." });
                }
                avatarUrl = avatarUploadResult.url;
            } catch (uploadError) {
                console.error("Avatar Upload Error:", uploadError);
                return res.status(500).json({ message: "Error uploading avatar." });
            }
            const user = await User.create({
                channelname,
                fullname: `${firstname} ${lastname}`,
                password,
                email,
                avatar: avatarUrl,
            });

            const createdUser = await User.findById(user._id).select("-password -refreshToken");
            if (!createdUser) {
                return res.status(500).json({ message: "Server error during registration." });
            }
            res.status(201).json({
                message: "User registered successfully.",
                user: createdUser
            });

        } catch (error) {
            console.error("Register Error:", error);
            res.status(500).json({ message: "Internal Server Error." });
        }
    }
);
//2.Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required to log in." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found. Please register first." });
        }
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Incorrect password. Please try again." });
        }

        const { accessToken, refreshToken } = await generateTokens(user._id);


        const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

        const options = {
            httpOnly: true,
            secure: true
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
        await User.findByIdAndUpdate(req.user._id, { $push: { Videos: video._id } }, { new: true });

        return res.status(201).json({ message: "Video uploaded successfully.", video });

    } catch (error) {
        console.error("Video Upload Error:", error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
});
//6.video Delete Route
router.post('/deleteVideo/:videoId', verifyJWT, async (req, res) => {
    try {
        const videoId = req.params.videoId;
        const video = await Video.findById(videoId);

        if (!video) {
            return res.status(404).json({ message: "Video not found." });
        }

        if (!video.owner.equals(req.user._id)) {
            return res.status(403).json({ message: "You do not have permission to delete this video." });
        }

        try {
            if (video.videoFile) {
                await cloudinary.uploader.destroy(video.videoFile);
            }
            if (video.thumbnail) {
                await cloudinary.uploader.destroy(video.thumbnail);
            }
        } catch (cloudinaryError) {
            console.error("Cloudinary Deletion Error:", cloudinaryError);
            return res.status(500).json({ message: "Error deleting video from Cloudinary." });
        }

        await Video.findByIdAndDelete(videoId);
        await Comment.deleteMany({ video: videoId });
        await User.findByIdAndUpdate(req.user._id, { $pull: { Videos: videoId } });

        return res.status(200).json({ message: "Video deleted successfully." });

    } catch (error) {
        console.error("Delete Video Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// 7. Like Video Route
router.post("/likeVideo/:videoId", verifyJWT, async (req, res) => {
    try {
        const videoId = req.params.videoId;
        const userId = req.user._id;
        console.log(userId)
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found." });
        }

        if (video.Likes.includes(userId)) {
            return res.status(400).json({ message: "Video already liked." });
        }

        video.Likes.push(userId);
        await video.save();

        return res.status(200).json({ message: "Video liked successfully." });
    } catch (error) {
        console.error("Like Video Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// 8. Unlike Video Route
router.post("/unlikeVideo/:videoId", verifyJWT, async (req, res) => {
    try {
        const videoId = req.params.videoId;
        const userId = req.user._id;

        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found." });
        }

        if (!video.Likes.includes(userId)) {
            return res.status(400).json({ message: "Video not yet liked." });
        }

        video.Likes = video.Likes.filter(id => !id.equals(userId));
        await video.save();

        return res.status(200).json({ message: "Video unliked successfully." });
    } catch (error) {
        console.error("Unlike Video Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Subscribe to Channel Route
router.post("/subscribe/:channelId", verifyJWT, async (req, res) => {
    try {
        const channelId = req.params.channelId;
        const userId = req.user._id;

        if (channelId === userId.toString()) {
            return res.status(400).json({ message: "Cannot subscribe to your own channel." });
        }

        const channel = await User.findById(channelId).populate("Videos");
        if (!channel) {
            return res.status(404).json({ message: "Channel not found." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isAlreadySubscribed = channel.Suscribers.includes(userId);
        if (isAlreadySubscribed) {
            return res.status(400).json({ message: "Already subscribed to this channel." });
        }

        channel.Suscribers.push(userId);
        user.SuscribeTo.push(channelId);

        const channelVideos = channel.Videos;

        if (channelVideos.length > 0) {
            console.log(`Adding ${channelVideos.length} videos to user's feed`);
        }

        await channel.save();
        await user.save();

        return res.status(200).json({ message: "Subscribed to channel successfully." });
    } catch (error) {
        console.error("Subscribe to Channel Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Unsubscribe from Channel Route
router.post("/unsubscribe/:channelId", verifyJWT, async (req, res) => {
    try {
        const channelId = req.params.channelId;
        const userId = req.user._id;

        const channel = await User.findById(channelId).populate("Videos");
        if (!channel) {
            return res.status(404).json({ message: "Channel not found." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isSubscribed = channel.Suscribers.includes(userId);
        if (!isSubscribed) {
            return res.status(400).json({ message: "You are not subscribed to this channel." });
        }

        channel.Suscribers = channel.Suscribers.filter(
            (subscriberId) => subscriberId.toString() !== userId.toString()
        );

        user.SuscribeTo = user.SuscribeTo.filter(
            (subscribedChannelId) => subscribedChannelId.toString() !== channelId.toString()
        );

        const channelVideos = channel.Videos;

        if (channelVideos.length > 0) {
            console.log(`Removing ${channelVideos.length} videos from user's feed`);
        }

        await channel.save();
        await user.save();

        return res.status(200).json({ message: "Unsubscribed from channel successfully." });
    } catch (error) {
        console.error("Unsubscribe from Channel Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
//17.get all Videos
router.get('/getAllVideos', verifyJWT, async (req, res) => {
    try {
        const video = await Video.find().populate('owner', '_id avatar channelname fullname Suscribers');
        return res.status(203).json({ video: video });
    } catch (error) {
        return res.status(504).json({ message: "Internal Server Error" })
    }
})
// comment add route
router.post("/commentAdd/:videoId", verifyJWT, async (req, res) => {
    try {
        const userId = req.user._id;
        const videoId = req.params.videoId;
        const { content } = req.body;
        if (!content) {
            return res.status(403).json({ message: "Please provide the content" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(403).json({ message: "User does not exist" });
        }
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(403).json({ message: "Video not found" });
        }
        const comment = await Comment.create({
            content,
            video: videoId,
            owner: userId
        });
        return res.status(200).json({message:"Commnet add successfully"});
    } catch (error) {
        return res.status(500).json({ message: "Error creating comment", error: error.message });
    }
});
// Get all comments
router.get("/getComment", verifyJWT, async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate('video', '_id')
            .populate('owner', '_id channelname');
        return res.status(200).json({ comments });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
// Get Subscribed Users and their Videos
router.get('/subscribed', verifyJWT, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const subscribed = user.SuscribeTo;
        if (!subscribed || subscribed.length === 0) {
            return res.status(403).json({ message: "User is not subscribed to any channel" });
        }
        const videoPromises = subscribed.map((subscribedUserId) => {
            return Video.find({ owner: subscribedUserId })
                .populate('owner', '_id avatar channelname fullname');
        });
        const videosArray = await Promise.all(videoPromises);
        const videos = videosArray.flat();

        return res.status(200).json({
            message: "Subscribed users' videos fetched successfully",
            videos: videos
        });
    } catch (error) {
        console.error("Error fetching subscribed users' videos:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
// Video and user search route
router.post('/search', verifyJWT,async (req, res) => {
    try {
        console.log("search Data",req.body);
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: "Search content is required" });
        }
        const searchRegex = new RegExp(content, 'i');
        const matchingUsers = await User.find({
            $or: [
                { fullname: searchRegex },
                { channelname: searchRegex }
            ]
        });
        const userIds = matchingUsers.map(user => user._id);
        const videos = await Video.find({
            $or: [
                { owner: { $in: userIds } }, 
                { title: searchRegex },        
                { description: searchRegex },     
                { type: searchRegex }        
            ]
        })
        .populate('owner', 'channelname') 
        .sort({ createdAt: -1 })           
        .limit(20);                       

        res.json(videos);
    } catch (error) {
        console.error("Error fetching videos:", error);
        res.status(500).json({ message: "Server error" });
    }
});
export default router;



