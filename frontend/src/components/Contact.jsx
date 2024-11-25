import React from "react";

function Contact() {
    return (
        <div className="bg-gray-900 w-full h-9/10 text-white p-8 md:p-16 flex items-center justify-center">
            <div className="max-w-4xl w-full mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-teal-500">
                    Contact Us
                </h2>
                <p className="text-lg md:text-xl text-center mb-12 text-gray-300">
                    We’d love to hear from you! Whether you have a question, feedback, or need assistance, feel free to reach out.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <h3 className="text-2xl text-teal-400 font-semibold mb-4">
                            Send Us a Message
                        </h3>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-lg font-medium mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-lg font-medium mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-lg font-medium mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                                    placeholder="Your Message"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-full text-lg transition duration-200 transform hover:scale-105"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg">
                        <h3 className="text-2xl text-teal-400 font-semibold mb-4">
                            Contact Information
                        </h3>
                        <p className="mb-4 text-gray-300">
                            Feel free to reach us through any of the following ways. Our support team is available 24/7 to assist you.
                        </p>
                        <div className="space-y-4 text-lg text-gray-300">
                            <div>
                                <span className="font-semibold text-teal-300">Email:</span> support@SAND.com
                            </div>
                            <div>
                                <span className="font-semibold text-teal-300">Phone:</span> +91 1234567890
                            </div>
                            <div>
                                <span className="font-semibold text-teal-300">Address:</span> GLA University, Mathura, U.P., India
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
