import { useState } from 'react';

function SideNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-800 text-white transition-all duration-300 flex flex-col`}
      >
        <button
          className="p-4 hover:bg-gray-700"
          onClick={toggleSidebar}
        >
          <div className="relative w-8 h-8">
            <span
              className={`block h-1 bg-white rounded transition-transform duration-300 ${
                isSidebarOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`block h-1 bg-white rounded my-1 transition-opacity duration-300 ${
                isSidebarOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`block h-1 bg-white rounded transition-transform duration-300 ${
                isSidebarOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </div>
        </button>

        <div className="flex flex-col space-y-4 mt-6">
          <a href="/" className="flex items-center p-4 hover:bg-gray-700">
            <img
              src="/assets/svgs/home.png"
              alt="Home"
              height={28}
              width={28}
            />
            {isSidebarOpen && <span className="ml-4">Home</span>}
          </a>
          <a href="/upload" className="flex items-center p-4 hover:bg-gray-700">
            <img
              src="/assets/svgs/upload.png"
              alt="Upload"
              height={28}
              width={28}
            />
            {isSidebarOpen && <span className="ml-4">Upload</span>}
          </a>
          <a href="/subscription" className="flex items-center p-4 hover:bg-gray-700">
            <img
              src="/assets/svgs/crown.png" 
              alt="Subscriptions"
              height={28}
              width={28}
            />
            {isSidebarOpen && <span className="ml-4">Subscriptions</span>}
          </a>
        </div>
      </div>
    </div>
  );
}

export default SideNavbar;
