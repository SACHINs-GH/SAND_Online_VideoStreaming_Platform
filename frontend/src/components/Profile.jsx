import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import { watchVideo } from "../features/watchVideoSlice";
import { place } from "../features/watchVideoSlice";
import axios from "axios";

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/getAllVideos", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const video = response.data.video;
        const filteredVideo = video.filter((item) => item.owner._id === user._id);
        setVideos(filteredVideo);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && accessToken) {
      fetchVideos();
    }
  }, [user, accessToken]);

const handleDelete = async (videoId) => {
  try {
    await axios.post(`http://localhost:5000/user/deleteVideo/${videoId}`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setVideos((prevVideos) => prevVideos.filter((video) => video._id !== videoId));
    alert("Video deleted successfully!");
  } catch (error) {
    console.error("Failed to delete video:", error);
    alert("Error deleting video.");
  }
};

  const handleWatchVideo = (video) => {
    console.log('Dispatching video:', video);
    dispatch(watchVideo({ videoObject: video }));
    dispatch(place({place:'/profile'}))
    navigate("/watch");
  };

  if (!user) {
    return (
      <div className="flex flex-col w-full items-center justify-center h-screen bg-gray-200">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">No user registered yet</h1>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center bg-gray-300 py-5">
      <div className="m-auto bg-white backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-2xl w-11/12 md:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105">
        <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">{user.channelname}</h1>

        <img
          className="m-auto rounded-full bg-gray-300 h-32 w-32 text-gray-800 text-center text-lg flex justify-center items-center object-cover"
          src={user.avatar || "https://via.placeholder.com/128"}
          alt="User Avatar"
        />

        <h3 className="text-xl font-bold text-gray-800 my-4 text-center">
          {user.Suscribers?.length || 0} Subscribers
        </h3>
      </div>

      <div className="flex justify-center items-center py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Uploaded Videos</h2>
      </div>

      {loading ? (
        <h2 className="text-lg font-semibold text-gray-700 mt-6">Loading videos...</h2>
      ) : videos.length > 0 ? (
        <div className="overflow-x-auto w-full px-4">
          <div className="grid grid-flow-col auto-cols-max gap-3">
            {videos.map((video) => (
              <div key={video._id} className="bg-white rounded-lg shadow-md p-4 w-64"
              >
                <div className="relative bg-gray-300 h-48 mb-4">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg shadow-md"
                      onClick={() => handleWatchVideo(video)}
                    >
                      Watch Video
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold">{video.title || "Untitled Video"}</h3>
                <p className="text-gray-600">{user.channelname}</p>
                <p className="text-gray-500">
                  {video.Likes?.length || 0} Likes •{" "}
                  {video.createdAt && new Date(video.createdAt).toDateString()}
                </p>
                <button
                  onClick={() => handleDelete(video._id)}
                  className="w-full mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
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
