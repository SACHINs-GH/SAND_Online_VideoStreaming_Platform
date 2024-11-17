
import { useSelector } from 'react-redux';

function ViewVideo() {
    const video = useSelector((state) => state.watch?.videoObject);
    console.log(`video:${video.owner}`)
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
            <div className='flex w-6/12 justify-between items-center border border-white rounded-md p-2'>
                <button className='border border-white rounded-md p-2 bg-blue-700 text-white'>Likes : {video.Likes.length}</button>
                <button >{formattedDate}</button>
                <button className='border border-white rounded-md p-2 bg-red-500 text-white'>Suscribers : {video.owner.Suscribers.length}</button>
            </div>
        </div>
    );
}

export default ViewVideo;
