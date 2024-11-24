import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { watchVideo, place } from '../features/watchVideoSlice';

function SearchedData() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchedData = useSelector((state) => state.search.searchedData);

  const handleWatchVideo = (video) => {
    dispatch(watchVideo({ videoObject: video }));
    dispatch(place({ place: '/search' })); 
    navigate('/watch');
  };

  if (!searchedData || searchedData.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Search Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchedData.map((video) => (
          <div key={video._id} className="border rounded-lg p-4 shadow-md">
            <h1 className='text-2xl mb-3'>{video.owner.channelname}</h1>
            {video.thumbnail ? (
              <img src={video.thumbnail} alt="Video Thumbnail" className="w-full h-auto rounded-md mb-2" />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-md mb-2 flex items-center justify-center">
                <span>No Thumbnail</span>
              </div>
            )}
            <h3 className="text-xl font-semibold">{video.title}</h3>
            <p className="text-gray-600">{video.description}</p>
            <button
              onClick={() => handleWatchVideo(video)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Watch Video
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchedData;
