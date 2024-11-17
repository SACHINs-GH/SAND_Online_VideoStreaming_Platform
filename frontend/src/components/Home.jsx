// src/components/Videos.jsx
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { watchVideo } from "../features/watchVideoSlice.js";
import { useNavigate } from "react-router-dom";

function Videos() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            setError('You are not registered yet');
            setLoading(false);
            return;
        }

        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user/getAllVideos', {
                    withCredentials: true,
                });
                if (response.data.video && response.data.video.length) {
                    // Filter out videos that belong to the current user
                    const filteredVideos = response.data.video.filter((video) => video.owner._id !== user._id);
                    
                    // Sort videos by the creation date (assuming `createdAt` exists)
                    filteredVideos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                    setVideos(filteredVideos);
                } else {
                    setError('No videos available');
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError('Failed to fetch videos');
                setLoading(false);
            }
        };

        fetchVideos();
    }, [user]);

    const handleWatchVideo = (video) => {
        console.log('Dispatching video:', video);
        dispatch(watchVideo({ videoObject: video }));
        navigate("/watch");
    };

    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center w-full h-screen bg-white text-white">
                <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-red-500 mb-4">Oops!</h2>
                    <p className="text-xl">{error}</p>
                    <p className="text-md mt-4 text-gray-400">Please sign up or log in to enjoy our video collection.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white w-full min-h-screen text-white p-4 md:p-6">
            <div className="w-full mx-auto">
                <div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    style={{ maxHeight: 'calc(92vh)', overflowY: 'auto' }}
                >
                    {videos.length === 0 ? (
                        <p className="text-lg text-center text-gray-400">No videos available</p>
                    ) : (
                        videos.map((video) => (
                            <div
                                key={video._id}
                                className="bg-gray-300 rounded-lg p-2 shadow-lg relative overflow-hidden group"
                                style={{ height: '330px' }}
                                onClick={() => handleWatchVideo(video)}
                            >
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-2/3 object-cover rounded-lg group-hover:opacity-50 transition-opacity duration-300"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg shadow-md">
                                        Watch Video
                                    </button>
                                </div>

                                <div className="flex items-center mt-3 space-x-3">
                                    <img
                                        src={video.owner.avatar}
                                        alt={video.owner.channelname}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold text-black">{video.owner.channelname}</p>
                                        <p className="text-xs text-black">{video.owner.fullname}</p>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <h3 className="text-xl font-semibold text-emerald-400">
                                        {video.title}
                                    </h3>
                                    <p className="text-black text-sm line-clamp-2">
                                        {video.description}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Videos;
