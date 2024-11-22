import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ViewVideo() {
    const video = useSelector((state) => state.watch.videoObject);
    const navigate = useNavigate();
    const place = useSelector((state) => state.watch.place);
    const user = useSelector((state) => state.auth.user);
    const [likesCount, setLikesCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [subscribersCount, setSubscribersCount] = useState(0);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        if (video && user) {
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

    const getAuthToken = () => {
        return localStorage.getItem('accessToken') || '';
    };

    const handleLike = async () => {
        try {
            const endpoint = `http://localhost:5000/user/${isLiked ? 'unlikeVideo' : 'likeVideo'}/${video._id}`;
            const response = await axios.post(
                endpoint,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${getAuthToken()}`,
                    },
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
                setIsLiked(!isLiked);
            }
        } catch (error) {
            console.error("Error liking/unliking video:", error);
        }
    };

    const handleSubscribe = async () => {
        try {
            const endpoint = `http://localhost:5000/user/${isSubscribed ? 'unsubscribe' : 'subscribe'}/${video.owner._id}`;
            const response = await axios.post(
                endpoint,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${getAuthToken()}`,
                    },
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                setSubscribersCount(isSubscribed ? subscribersCount - 1 : subscribersCount + 1);
                setIsSubscribed(!isSubscribed);
            }
        } catch (error) {
            console.error("Error subscribing/unsubscribing:", error);
        }
    };

    const handleBack = () => {
        navigate(place);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-gray-900 text-white overflow-auto">
            <button 
                className="border border-white bg-blue-500 px-4 py-2 rounded-lg text-white mb-4" 
                onClick={handleBack}
            >
                Back To Place
            </button>
            <h2 className="text-3xl font-semibold text-emerald-400 mb-6 text-center">{video.title}</h2>
            <video controls className="w-full max-w-2xl rounded-lg shadow-lg mb-6">
                <source src={video.videoFile} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="text-center">
                <h3 className="text-xl font-semibold">{video.owner.channelname}</h3>
                <p className="text-sm text-gray-400">{video.owner.fullname}</p>
                <p className="mt-2 text-md text-gray-300 max-w-2xl mx-auto">{video.description}</p>
            </div>
            <div className="flex w-full max-w-md justify-between items-center border border-white rounded-md p-2 mt-4">
                <button
                    onClick={handleLike}
                    className={`border border-white rounded-md px-4 py-2 ${isLiked ? 'bg-green-500' : 'bg-blue-700'} text-white`}
                >
                    {isLiked ? 'Unlike' : 'Like'} : {likesCount}
                </button>
                <button className="text-sm">{formattedDate}</button>
                <button
                    onClick={handleSubscribe}
                    className={`border border-white rounded-md px-4 py-2 ${isSubscribed ? 'bg-gray-500' : 'bg-red-500'} text-white`}
                >
                    {isSubscribed ? 'Unsubscribe' : 'Subscribe'} : {subscribersCount}
                </button>
            </div>
        </div>
    );
}

export default ViewVideo;
