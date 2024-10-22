import React from 'react';

const Login = () => {
  return (
    <div className="relative flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1728827098446-a77f1c54ac74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8')` }}>
      
      {/* Transparent Login Form */}
      <div className="bg-transparent bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-2xl w-11/12 md:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign in to Website</h1>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500 transition-transform transform hover:scale-105"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500 transition-transform transform hover:scale-105"
        />

        {/* Sign In Button */}
        <button className="w-full p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:scale-110 transition-all transform mb-4">
          Sign in
        </button>

        {/* Sign Up Link */}
        <div className="flex justify-center text-sm text-gray-600">
          <span>Don't have an account?</span>&nbsp;
          <a href="#" className="text-blue-600 hover:underline">Sign Up now</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
