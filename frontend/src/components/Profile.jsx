// src/components/Profile.js
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // Redirect to login if no user is registered
  if (!user) {
    return (
      <div className="flex flex-col w-full items-center justify-center h-screen bg-gray-200">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">No user registered yet</h1>
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    );
  }

  // Use user's video list if available, otherwise provide empty array as fallback
  const videos = user.videos || [];

  return (
    <div className="flex flex-col w-full items-center bg-gray-300 py-5">
      <div className="m-auto bg-white backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-2xl w-11/12 md:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105">
        <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">{user.channelname}</h1>
        
        <img
          className="m-auto rounded-full bg-gray-300 h-32 w-32 text-gray-800 text-center text-lg flex justify-center items-center object-cover"
          src={user.avatar || "https://via.placeholder.com/128"}
          alt="User Avatar"
        />
        
        <h3 className="text-xl font-bold text-gray-800 my-4 text-center">{user.subscribers?.length || 0} Subscribers</h3>
      </div>

      <div className="flex justify-center items-center py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Uploaded Videos</h2>
      </div>

      {videos.length > 0 ? (
        <div className="overflow-x-auto w-full px-4">
          <div className="grid grid-flow-col auto-cols-max gap-3">
            {videos.map((video, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 w-64">
                <div className="bg-gray-300 h-48 mb-4"></div>
                <h3 className="text-lg font-semibold">{video.title || `Video Title ${index + 1}`}</h3>
                <p className="text-gray-600">{user.channelname}</p>
                <p className="text-gray-500">{video.views} views • {video.daysAgo} days ago</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h2 className="text-lg font-semibold text-gray-700 mt-6">No videos uploaded yet</h2>
      )}
    </div>
  );
}

export default Profile;
