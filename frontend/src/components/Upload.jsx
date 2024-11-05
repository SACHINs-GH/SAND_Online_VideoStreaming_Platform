import React from "react";
import { useState } from "react";
function Uplaod() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="flex">
            <div
                className={`${isSidebarOpen ? "w-64" : "w-20"
                    } bg-gray-800 text-white transition-all duration-300 flex flex-col`} >
                <button
                    className="p-4 hover:bg-gray-700"
                    onClick={toggleSidebar}
                >
                    <div className="relative w-8 h-8">
                        <span
                            className={`block h-1 bg-white rounded transition-transform duration-300 ${isSidebarOpen ? "rotate-45 translate-y-2" : ""
                                }`}></span>
                        <span
                            className={`block h-1 bg-white rounded my-1 transition-opacity duration-300 ${isSidebarOpen ? "opacity-0" : ""
                                }`}></span>
                        <span
                            className={`block h-1 bg-white rounded transition-transform duration-300 ${isSidebarOpen ? "-rotate-45 -translate-y-2" : ""
                                }`}></span>
                    </div>
                </button>

                <div className="flex flex-col space-y-4 mt-6">
                    <a href="/" className="flex items-center p-4 hover:bg-gray-700">
                        <img src="./src/assets/svgs/home.png" alt="home" height={28} width={28} />
                        {isSidebarOpen && <span className="ml-4">Home</span>}
                    </a>
                    <a href="/upload" className="flex items-center p-4 hover:bg-gray-700">
                        <img src="./src/assets/svgs/upload.png" alt="search" height={28} width={28} />
                        {isSidebarOpen && <span className="ml-4">Upload</span>}
                    </a>
                    <a href="/subscription" className="flex items-center p-4 hover:bg-gray-700">
                        <img src="./src/assets/svgs/crown.png" alt="subscriptions" height={28} width={28} />
                        {isSidebarOpen && <span className="ml-4">Subscriptions</span>}
                    </a>
                </div>
            </div>
            <div className="flex flex-col items-center h-8/10 bg-transparent bg-opacity-70 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-2xl w-full  ">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Upload an Video</h1>
                <div className="w-full text-lg font-bold text-gray-800">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Title"
                        className="w-full p-3 mb-4 border border-gray-300  rounded-lg text-sm bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="text-lg font-bold text-gray-800">Description</label>
                    <textarea id="description" rows="4" cols="200" className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-600" placeholder="Description " required></textarea>
                </div>

                <div className="w-full text-lg font-bold text-gray-800">
                    <label htmlFor="type">Category</label>
                    <div className="flex w-full gap-8 p-4">
                        <input type="radio" name="type" id="type1" /> Action
                        <input type="radio" name="type" id="type2" /> Comedy
                        <input type="radio" name="type" id="type3" /> Music
                        <input type="radio" name="type" id="type4" /> Experimental
                    </div>

                </div>

                <div className="relative w-full mb-4 text-lg font-bold text-gray-800">
                    <label htmlFor="thumbnail">Thumbnail</label>
                    <input
                        id="thumbnail"
                        type="file"
                        className="w-full p-3 text-sm cursor-pointer border border-gray-300  rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                </div>
                <div className="relative w-full mb-4 text-lg font-bold text-gray-800">
                    <label htmlFor="videoFile">Video</label>
                    <input
                        id="videoFile"
                        type="file"
                        className="w-full p-3 text-sm cursor-pointer border border-gray-300  rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                </div>

                <button className="w-1/3 p-3 bg-teal-500 text-white  rounded-lg hover:bg-teal-700 hover:scale-110 transition-all transform mb-4">
                    Upload Video
                </button>
            </div>
        </div>
    )
}
export default Uplaod