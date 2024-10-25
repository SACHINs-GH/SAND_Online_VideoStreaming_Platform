import React from "react";
function Profile() {
    return(
        <div className="flex flex-col w-full justify-center item-center bg-gray-300 py-5">
            <div className="m-auto bg-white backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-2xl w-11/12 md:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105">
                <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">UserName</h1>
                <div className="m-auto rounded-full bg-red-400 h-32 w-32 text-gray-800 text-center text-lg flex justify-center items-center">Avtar</div>
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">History</h2>
                <div className="flex-1 p-4 overflow-x-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array(4)
                    .fill(0)
                    .map((_, index) => (
                    <ul className="overflow-x-auto flex justify-evenly whitespace-nowrap">
                        <li className="inline-block mr-4">
                           <div
                                key={index}
                                className="bg-white rounded-lg shadow-md p-2 max-w-xl sm:max-w-lg "
                            >
                                <div className="bg-gray-300 h-20 mb-4"></div>
                                <h3 className="text-lg font-semibold">Video Title {index + 1}</h3>
                                <p className="text-gray-600">Channel Name</p>
                                <p className="text-gray-500">1.2M views • 3 days ago</p>
                            </div> 
                        </li>
                    </ul>
                    
                    ))}
                </div>
            </div>
            </div>
            <div className="">
                <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Subscribers</h2>
                <ul className="flex">
                    <li className="m-auto">
                        <div className="relative bg-white backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-2xl transition-transform transform hover:scale-105">
                            <div className="m-auto rounded-full bg-red-400 h-16 w-16 text-gray-800 text-center text-m flex justify-center items-center">Sub. Avtar</div>
                            <h1 className="text-l font-bold text-gray-800 mb-6 text-center">Sub. Name</h1>
                        </div> 
                    </li>
                    <li className="m-auto">
                        <div className="relative bg-white backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-2xl transition-transform transform hover:scale-105">
                            <div className="m-auto rounded-full bg-red-400 h-16 w-16 text-gray-800 text-center text-m flex justify-center items-center">Sub. Avtar</div>
                            <h1 className="text-l font-bold text-gray-800 mb-6 text-center">Sub. Name</h1>
                        </div> 
                    </li>
                    <li className="m-auto">
                        <div className="relative bg-white backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-2xl transition-transform transform hover:scale-105">
                            <div className="m-auto rounded-full bg-red-400 h-16 w-16 text-gray-800 text-center text-m flex justify-center items-center">Sub. Avtar</div>
                            <h1 className="text-l font-bold text-gray-800 mb-6 text-center">Sub. Name</h1>
                        </div> 
                    </li>
                    <li className="m-auto">
                        <div className="relative bg-white backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-2xl transition-transform transform hover:scale-105">
                            <div className="m-auto rounded-full bg-red-400 h-16 w-16 text-gray-800 text-center text-m flex justify-center items-center">Sub. Avtar</div>
                            <h1 className="text-l font-bold text-gray-800 mb-6 text-center">Sub. Name</h1>
                        </div> 
                    </li>
                    <li className="m-auto">
                        <div className="relative bg-white backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-2xl transition-transform transform hover:scale-105">
                            <div className="m-auto rounded-full bg-red-400 h-16 w-16 text-gray-800 text-center text-m flex justify-center items-center">Sub. Avtar</div>
                            <h1 className="text-l font-bold text-gray-800 mb-6 text-center">Sub. Name</h1>
                        </div> 
                    </li>
                </ul>
                
            </div>
        </div>
    )    
}
 export default Profile