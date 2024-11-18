import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ViewVideo() {
    const video = useSelector((state) => state.watch.videoObject);
    const user = useSelector((state) => state.auth.user);
    const [likesCount, setLikesCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [subscribersCount, setSubscribersCount] = useState(0);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        if (video && user) {
            console.log(video.owner.Suscribers)
            setLikesCount(video.Likes?.length || 0);
            setIsLiked(video.Likes?.includes(user._id));
            setSubscribersCount(video.owner.Suscribers?.length || 0);
            setIsSubscribed(video.owner.Suscribers?.includes(user._id));
        }
    }, [video, user]);

    if (!video) {
        return (
            <div className="flex items-center justify-center w-full h-screen bg-gray-800 text-white">
                <p className="text-lg">No video selected.</p>
            </div>
        );
    }

    const formattedDate = new Date(video.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Helper function to get token from localStorage
    const getAuthToken = () => {
        return localStorage.getItem('accessToken') || '';
    };

    const handleLike = async () => {
        try {
            const endpoint = `http://localhost:5000/user/${isLiked ? 'unlikeVideo' : 'likeVideo'}/${video._id}`;
            const response = await axios.post(
                endpoint,
                {}, // Empty body
                {
                    headers: {
                        'Authorization': `Bearer ${getAuthToken()}`, // Send the token as a Bearer token
                    },
                    withCredentials: true // Ensure cookies are sent
                }
            );

            if (response.status === 200) {
                setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
                setIsLiked(!isLiked);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Unauthorized: Invalid or expired token.");
            } else {
                console.error("Error liking/unliking video:", error);
            }
        }
    };

    const handleSubscribe = async () => {
        try {
            const endpoint = `http://localhost:5000/user/${isSubscribed ? 'unsubscribe' : 'subscribe'}/${video.owner._id}`;
            const response = await axios.post(
                endpoint,
                {}, // Empty body
                {
                    headers: {
                        'Authorization': `Bearer ${getAuthToken()}`, // Send the token as a Bearer token
                    },
                    withCredentials: true // Ensure cookies are sent
                }
            );

            if (response.status === 200) {
                setSubscribersCount(isSubscribed ? subscribersCount - 1 : subscribersCount + 1);
                setIsSubscribed(!isSubscribed);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Unauthorized: Invalid or expired token.");
            } else {
                console.error("Error subscribing/unsubscribing:", error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen p-8 bg-gray-900 text-white">
            <h2 className="text-3xl font-semibold text-emerald-400 mb-6">{video.title}</h2>
            <video controls width="800" className="rounded-lg shadow-lg mb-6">
                <source src={video.videoFile} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="text-center">
                <h3 className="text-xl font-semibold">{video.owner.channelname}</h3>
                <p className="text-sm text-gray-400">{video.owner.fullname}</p>
                <p className="mt-2 text-md text-gray-300">{video.description}</p>
            </div>
            <div className="flex w-6/12 justify-between items-center border border-white rounded-md p-2">
                <button 
                    onClick={handleLike} 
                    className={`border border-white rounded-md p-2 ${isLiked ? 'bg-green-500' : 'bg-blue-700'} text-white`}
                >
                    {isLiked ? 'Unlike' : 'Like'} : {likesCount}
                </button>
                <button>{formattedDate}</button>
                <button 
                    onClick={handleSubscribe} 
                    className={`border border-white rounded-md p-2 ${isSubscribed ? 'bg-gray-500' : 'bg-red-500'} text-white`}
                >
                    {isSubscribed ? 'Unsubscribe' : 'Subscribe'} : {subscribersCount}
                </button>
            </div>
        </div>
    );
}

export default ViewVideo;
