import React from "react";
function Profile() {
    return (
        <div className="flex flex-col w-full justify-center item-center bg-gray-300 py-5">
            <div className="m-auto bg-white backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-2xl w-11/12 md:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105">
                <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">UserName</h1>
                <div className="m-auto rounded-full bg-red-400 h-32 w-32 text-gray-800 text-center text-lg flex justify-center items-center">Avtar</div>
                <h3 className="text-xl font-bold text-gray-800 my-4 text-center">1M Subcribers</h3>
            </div>
            <div className="flex justify-center item-center py-4">
                <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Uploaded Videos</h2>
            </div>
            <div className="overflow-x-auto">
                <div className="grid grid-flow-col auto-cols-max gap-3">
                    {Array(10).fill(0).map((_, videoIndex) => (
                        <div
                            key={videoIndex}
                            className="bg-white rounded-lg shadow-md p-4 w-64"
                        >
                            <div className="bg-gray-300 h-48 mb-4"></div>
                            <h3 className="text-lg font-semibold">Video Title {videoIndex + 1}</h3>
                            <p className="text-gray-600">Channel Name</p>
                            <p className="text-gray-500">1.2M views • 3 days ago</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Profile