import React from "react";
import { Link } from "react-router-dom";

function About() {
    return (
        <div className="bg-gray-900 w-full min-h-screen text-white p-5 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-3 text-emerald-400 gradient-text">
                    About Us
                </h2>
                <p className="text-lg md:text-xl mb-1 text-gray-300">
                    Welcome to SAND! Your ultimate destination for streaming videos.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Our Aim",
                            content:
                                "We aim to redefine the streaming experience by offering diverse, inclusive, and engaging content for everyone.",
                        },
                        {
                            title: "Why Choose Us",
                            content:
                                "Ad-free streaming of high-quality videos to keep you entertained, always!",
                        },
                        {
                            title: "Available Anytime, Anywhere",
                            content:
                                "Watch videos on any device, from mobile to desktop, with seamless streaming.",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-md p-3 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
                        >
                            <h3 className="text-lg font-semibold mb-2 text-emerald-400">
                                {item.title}
                            </h3>
                            <p className="text-gray-300 text-sm">{item.content}</p>
                        </div>
                    ))}
                </div>

                {/* Developers Section with Smaller Cards */}
                <div className="mt-9">
                    <h3 className="text-3xl font-bold mb-3 gradient-text">
                        Meet Our <span className="text-amber-400">Developers</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                name: "Sachin Kumar",
                                role: "Frontend Developer",
                                description:
                                    "Specializes in creating intuitive, beautiful user interfaces using React and Tailwind CSS.",
                                imgPath:"./src/assets/images/Sachin's Pic.jpg"
                            },
                            {
                                name: "Nikhil Bansal",
                                role: "Backend Developer",
                                description:
                                    "Passionate about scalable systems and APIs. Works with Node.js and MongoDB to ensure seamless data flow.",
                                imgPath:"./src/assets/images/Nikhil's Pic.jpg"
                            },
                            {
                                name: "Divyanshi Gupta",
                                role: "UI/UX Designer",
                                description:
                                    "Ensures the platform is both visually appealing and user-friendly, focusing on a seamless user experience.",
                                imgPath:""
                            },
                            {
                                name: "Abhi Gupta",
                                role: "DevOps Engineer",
                                description:
                                    "Handles deployment and server management, ensuring that the platform is fast, reliable, and secure.",
                                imgPath:"./src/assets/images/Abhi's Pic.jpg"
                            },
                        ].map((dev, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 rounded-md p-4 text-center shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
                            >
                                <img
                                    src={dev.imgPath}
                                    alt={dev.name}
                                    className="w-20 h-20 mx-auto rounded-full mb-3 border-2 border-emerald-400"
                                />
                                <h4 className="text-lg font-semibold">{dev.name}</h4>
                                <p className="text-amber-400 text-sm">{dev.role}</p>
                                <p className="mt-1 text-gray-300 text-xs">{dev.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <div className="mt-8">
                    <Link
                        to="/"
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 px-6 rounded-full text-lg shadow-lg transition duration-200 transform hover:-translate-y-1"
                    >
                        Explore SAND
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default About;
