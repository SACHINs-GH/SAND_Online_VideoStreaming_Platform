import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Videos() {
    const user = useSelector((state) => state.auth.user);  // Get user from Redux store
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            setError('You are not registered yet');  // Show error if user is not logged in
            setLoading(false);
            return;
        }
        
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user/getAllVideos', {
                    withCredentials: true, // Ensure cookies are sent (for session management)
                });
                if (response.data && response.data.length) {
                    setVideos(response.data);  // Store the fetched videos in state
                } else {
                    setError('No videos available');  // Handle case if no videos exist
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch videos');  // Handle errors
                setLoading(false);
            }
        };

        fetchVideos();
    }, [user]);

    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center w-full h-screen bg-gray-900 text-white">
                <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-red-500 mb-4">Oops!</h2>
                    <p className="text-xl">{error}</p>
                    <p className="text-md mt-4 text-gray-400">Please sign up or log in to enjoy our video collection.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 w-full h-screen text-white p-8 md:p-16">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-teal-500">
                    Available Videos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.length === 0 ? (
                        <p className="text-lg text-center text-gray-400">No videos available</p>
                    ) : (
                        videos.map((video) => (
                            <div key={video.id} className="bg-gray-800 rounded-lg p-6 shadow-lg">
                                <h3 className="text-2xl font-semibold mb-4 text-emerald-400">
                                    {video.title}
                                </h3>
                                <p className="text-gray-300">{video.description}</p>
                                <video controls className="w-full mt-4">
                                    <source src={video.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Videos;
