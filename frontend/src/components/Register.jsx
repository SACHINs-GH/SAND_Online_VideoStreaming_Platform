import React from 'react';

const Register = () => {
  return (
    <div className="relative flex justify-center items-center h-8/10 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1728827098446-a77f1c54ac74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8')` }}>
      
      <div className="bg-transparent bg-opacity-70 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-2xl w-11/12 md:w-1/2 lg:w-1/3 transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create an Account</h1>
        
        <div className="flex justify-center mb-6 text-sm text-gray-600">
          <span>Already have an account?</span>&nbsp;
          <a href="login" className="text-blue-600 hover:underline">Sign in</a>
        </div>

        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-1/2 p-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500 transition-transform transform hover:scale-105"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-1/2 p-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500 transition-transform transform hover:scale-105"
          />
        </div>
        <input
          type="text"
          placeholder="User Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500 transition-transform transform hover:scale-105"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500 transition-transform transform hover:scale-105"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500 transition-transform transform hover:scale-105"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500 transition-transform transform hover:scale-105"
        />
        <div className="relative w-full mb-4">
          <input
            type="file"
            className="w-full p-3 text-sm cursor-pointer border border-gray-300 rounded-full bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg transition-transform transform hover:scale-105"
          />
          <div className="absolute top-full left-0 bg-blue-100 p-2 w-36 text-xs shadow-lg hidden hover:block rounded-lg mt-1">
            Choose Avatar
          </div>
        </div>

        <button className="w-full p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:scale-110 transition-all transform mb-4">
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Register;
