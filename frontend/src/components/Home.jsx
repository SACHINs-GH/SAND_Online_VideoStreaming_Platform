import { useState } from "react";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-800 text-white transition-all duration-300 flex flex-col`}
      >
        <button
          className="p-4  hover:bg-gray-700"
          onClick={toggleSidebar}
        >
          <div className="relative w-8 h-8">
            <span
              className={`block h-1 bg-white rounded transition-transform duration-300 ${
                isSidebarOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-1 bg-white rounded my-1 transition-opacity duration-300 ${
                isSidebarOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-1 bg-white rounded transition-transform duration-300 ${
                isSidebarOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </div>
        </button>

        <div className="flex flex-col space-y-4 mt-6">
          <a href="/" className="flex items-center p-4 hover:bg-gray-700">
            <img src="./src/assets/svgs/home.png" alt="search" height={28} width={28} />
            {isSidebarOpen && <span className="ml-4">Home</span>}
          </a>
          <a href="/upload" className="flex items-center p-4 hover:bg-gray-700">
            <img src="./src/assets/svgs/upload.png" alt="search" height={28} width={28} />
            {isSidebarOpen && <span className="ml-4">Upload</span>}
          </a>
          <a href="/subscription" className="flex items-center p-4 hover:bg-gray-700">
            <img src="./src/assets/svgs/crown.png" alt="search" height={28} width={28} /> 
            {isSidebarOpen && <span className="ml-4">Subscriptions</span>}
          </a>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3">
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-2 max-w-xl sm:max-w-lg "
              >
                <div className="bg-gray-300 h-48 mb-4"></div>
                <h3 className="text-lg font-semibold">Video Title {index + 1}</h3>
                <p className="text-gray-600">Channel Name</p>
                <p className="text-gray-500">1.2M views • 3 days ago</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
