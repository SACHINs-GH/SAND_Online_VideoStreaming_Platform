import { useState, useEffect } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { watchVideo } from '../features/watchVideoSlice';
import { place } from '../features/watchVideoSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Subscription() {
    const [subscribedData, setSubscribedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [error, setError] = useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const fetchSubscribedData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user/subscribed', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const groupedData = response.data.videos.reduce((acc, video) => {
                    const ownerId = video.owner._id;
                    if (!acc[ownerId]) {
                        acc[ownerId] = {
                            owner: video.owner,
                            videos: [],
                        };
                    }
                    acc[ownerId].videos.push(video);
                    return acc;
                }, {});
                setSubscribedData(Object.values(groupedData));
            } catch (error) {
                setError('Error fetching data');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscribedData();
    }, [accessToken]);

    const handleWatchVideo = (video) => {
        dispatch(watchVideo({ videoObject: video }));
        dispatch(place({place:'/subscription'}));
        navigate("/watch");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex-1 flex flex-col p-4 overflow-y-auto space-y-8">
            {subscribedData.length === 0 ? (
                <div>No subscriptions found</div>
            ) : (
                subscribedData.map((userData, index) => (
                    <div className="space-y-6" key={index}>
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full bg-red-300 flex-shrink-0">
                                <img
                                    src={userData.owner.avatar}
                                    alt="Avatar"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-gray-800">
                                    {userData.owner.channelname}
                                </p>
                                <p className="text-gray-500">{userData.owner.fullname}</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <div className="grid grid-flow-col auto-cols-max gap-3">
                                {userData.videos.map((video, index) => (
                                    <div className="bg-white rounded-lg shadow-md p-4 w-64 relative" key={index}>
                                        <div className="bg-gray-300 h-48 mb-4">
                                            <img
                                                src={video.thumbnail}
                                                alt="Video Thumbnail"
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                        <h3 className="text-lg font-semibold">{video.title}</h3>
                                        <p className="text-gray-600">{video.owner.channelname}</p>
                                        <p className="text-gray-500">{video.Likes.length} Likes</p>
                                        <p className="text-gray-500">{video.type}</p>
                                        <p className="text-gray-500">{video.description}</p>
                                        <p className="text-gray-500">{new Date(video.createdAt).toLocaleDateString()}</p>
                                        
                                        <button
                                            onClick={() => handleWatchVideo(video)}
                                            className="mt-4 w-full py-2 bg-emerald-500 text-white font-semibold rounded-lg shadow-md"
                                        >
                                            Watch Video
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Subscription;
