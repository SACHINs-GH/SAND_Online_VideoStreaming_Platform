import { useState } from "react";
import { useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAuth } from "../features/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    channelname: '',
    email: '',
    password: '',
    avatar: null, 
  });
  
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        form.append(key, value);
      }
    });
    try {
      const response = await axios.post('http://localhost:5000/user/register', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      alert(response?.data?.message || 'Registration successful !');
      if (response.data.accessToken && response.data.refreshToken) {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          dispatch(setAuth({
            user: response.data.user,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          }));
        }

        navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage(error.response?.data?.message || 'An error occurred during registration');
      alert('Error: ' + (error.response?.data?.message || 'An error occurred during registration'));
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-cover bg-center" 
         style={{ backgroundImage: `url('https://images.unsplash.com/photo-1728827098446-a77f1c54ac74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8')` }}>
      <form 
        onSubmit={handleSubmit} 
        className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-md p-8 rounded-xl shadow-lg w-11/12 max-w-md md:max-w-lg lg:max-w-xl"
        style={{ height: 'auto', maxWidth: '400px' }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Create an Account</h1>
        
        <div className="flex justify-center mb-6 text-sm text-gray-600">
          <span>Already have an account?</span>&nbsp;
          <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
        </div>

        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
            className="w-1/2 p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
            className="w-1/2 p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        
        <input
          type="text"
          name="channelname"
          placeholder="User Name"
          value={formData.channelname}
          onChange={(e) => setFormData({ ...formData, channelname: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          required
        />
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          required
        />
        
        <div className="w-full mb-4">
          <input
            type="file"
            name="avatar"
            onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}
            className="w-full p-3 text-sm cursor-pointer border border-gray-300 rounded-lg bg-white transition-transform transform hover:scale-105"
            required
          />
        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm text-center mb-4">{errorMessage}</div>
        )}

        <button 
          type="submit" 
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all mb-4"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
