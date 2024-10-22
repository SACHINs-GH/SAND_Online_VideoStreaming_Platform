import React from "react";

function Header() {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md h-16">
      <div className="flex items-center justify-center p-3 w-1/6">
        <h1 className="text-xl">LOGO</h1>
      </div>

      <div className="flex items-center w-1/2">
        <input
          type="text"
          placeholder="Search"
          className="p-2 w-full text-center border border-gray-300 rounded-l-full focus:outline-none text-lg"
        />
        <button className="p-2.5 bg-gray-200 border-l border-gray-300 rounded-r-full">
          Search
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden sm:inline text-sm">User's Name</span>
        <div className="h-10 w-10 rounded-full bg-gray-400 overflow-hidden">
          <img
            src=""
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
