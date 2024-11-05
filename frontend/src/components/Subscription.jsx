import { useState } from "react";

function Subscription() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
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
            
            {/* Main Content - Vertical Layout with Horizontal Video Scrolling */}
            <div className="flex-1 flex flex-col p-4 overflow-y-auto space-y-8">
                {Array(5).fill(0).map((_, index) => (
                    <div className="space-y-6" key={index}>
                        {/* Header Section with Channel Info */}
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full bg-red-300 flex-shrink-0">
                                <img src="" alt="Avatar" className="w-full h-full rounded-full object-cover" />
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-gray-800">Channel Name</p>
                                <p className="text-gray-500">5 Subscribers</p> {/* Set subscribers to 5 */}
                            </div>
                        </div>

                        {/* Video Card Section - Horizontal Layout */}
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
                ))}
            </div>
        </div>
    );
}

export default Subscription;
