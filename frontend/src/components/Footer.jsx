import React from "react";
function Footer(){
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div>
                    <h3 className="text-2xl font-bold">SAND - Online Video Streaming Platform</h3>
                    <p className="text-sm">Your go-to platform for online video streaming</p>
                    <p className="text-sm">&copy; 2024 SAND | All rights reserved</p>
                </div>
                <div className="flex space-x-4">
                    <a href="/" className="hover:underline hover:text-red-500">Home</a>
                    <a href="/about" className="hover:underline hover:text-red-500">About</a>
                    <a href="/contact" className="hover:underline hover:text-red-500">Contact</a>
                    {/* Added These Just for Quick Navigation for some time i.e. until project is finished */}
                    <a href="/login" className="hover:underline hover:text-red-500">Login</a>
                    <a href="/profile" className="hover:underline hover:text-red-500">Profile</a>
                </div>
            </div>
        </footer>
    )
}
export default Footer