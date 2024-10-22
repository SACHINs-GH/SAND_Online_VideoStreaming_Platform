import React from 'react';

const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md w-11/12 md:w-4/5 lg:w-3/5 h-auto overflow-hidden">
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1728827098446-a77f1c54ac74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
            alt="our website"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-center p-10 md:w-1/2">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Create an account</h1>
          
          <div className="flex justify-center mb-4 text-sm text-gray-600">
            <span>Already have an account?</span>&nbsp;
            <a href="#" className="text-blue-600 hover:underline">Sign in</a>
          </div>

          <div className="flex w-4/5 space-x-4 mb-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 p-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 p-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <input
            type="text"
            placeholder="User Name"
            className="w-4/5 p-3 mb-4 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-4/5 p-3 mb-4 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-4/5 p-3 mb-4 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-4/5 p-3 mb-4 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500"
          />

          <div className="relative w-4/5 mb-4">
            <input
              type="file"
              className="p-3 text-sm cursor-pointer border border-gray-300 rounded-full w-full"
            />
            <div className="absolute top-full left-0 bg-blue-100 p-2 w-36 text-xs shadow-lg hidden hover:block rounded-lg mt-1">
              Choose Avatar
            </div>
          </div>

          <button className="w-4/5 p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
