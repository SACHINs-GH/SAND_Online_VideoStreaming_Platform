import React from "react";
function About(){
    return(
        <div className="bg-gray-900 text-white p-8 md:p-16">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-500">About Us</h2>
                <p className="text-lg md:text-xl mb-8">
                Welcome to SAND! Your ultimate destination for streaming videos.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-emerald-400">Our Aim</h3>
                    <p>
                    We aim to redefine the streaming experience by offering diverse, inclusive, and engaging content for everyone.
                    </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-emerald-400">Why Choose Us</h3>
                    <p>
                    Ad-free streaming of high-quality videos to keep you entertained, always!
                    </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-emerald-400">Available Anytime, Anywhere</h3>
                    <p>
                    Watch videos on any device, from mobile to desktop, with seamless streaming.
                    </p>
                </div>
                </div>
                
                <div className="mt-16">
                    <h3 className="text-3xl font-bold mb-8">Meet Our <span className="text-amber-400">Developers</span></h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-gray-800 rounded-lg p-6 text-center">
                            <img src="" alt="Sachin Kumar" className="w-24 h-24 mx-auto rounded-full mb-4" />
                            <h4 className="text-xl font-semibold">Sachin Kumar</h4>
                            <p className="text-amber-400">Frontend Developer</p>
                            <p className="mt-2">Specializes in creating intuitive, beautiful user interfaces using React and Tailwind CSS.</p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 text-center">
                            <img src="" alt="Nikhil Bansal" className="w-24 h-24 mx-auto rounded-full mb-4" />
                            <h4 className="text-xl font-semibold">Nikhil Bansal</h4>
                            <p className="text-amber-400">Backend Developer</p>
                            <p className="mt-2">Passionate about scalable systems and APIs. Works with Node.js and MongoDB to ensure seamless data flow.</p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 text-center">
                            <img src="" alt="Divyanshi Gupta" className="w-24 h-24 mx-auto rounded-full mb-4" />
                            <h4 className="text-xl font-semibold">Divyanshi Gupta</h4>
                            <p className="text-amber-400">UI/UX Designer</p>
                            <p className="mt-2">Ensures the platform is both visually appealing and user-friendly, focusing on a seamless user experience.</p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 text-center">
                            <img src="" alt="Abhi Gupta" className="w-24 h-24 mx-auto rounded-full mb-4" />
                            <h4 className="text-xl font-semibold">Abhi Gupta</h4>
                            <p className="text-amber-400">DevOps Engineer</p>
                            <p className="mt-2">Handles deployment and server management, ensuring that the platform is fast, reliable, and secure.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                <a href="/" className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-full text-lg transition duration-200">
                    Explore SAND
                </a>
                </div>
            </div>
        </div>
    )
}
export default About