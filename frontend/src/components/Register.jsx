// src/components/Register.js
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true); // Start loading when the form is submitted

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
      alert(response?.data?.message);

      if (response.data.accessToken && response.data.refreshToken) {
        dispatch(setAuth({
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        }));
      }
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred during registration');
    } finally {
      setLoading(false); // End loading after the request completes
    }
  };

  return (
    <div 
      className="relative flex justify-center items-center w-full h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1728827098446-a77f1c54ac74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8')` }}
    >
      <form 
        onSubmit={handleSubmit} 
        className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-11/12 max-w-md"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Create an Account</h1>
        
        <div className="flex space-x-4 mb-4">
          <input 
            type="text" 
            name="firstname" 
            placeholder="First Name" 
            value={formData.firstname} 
            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })} 
            className="w-1/2 p-3 border rounded-lg" 
            required 
          />
          <input 
            type="text" 
            name="lastname" 
            placeholder="Last Name" 
            value={formData.lastname} 
            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} 
            className="w-1/2 p-3 border rounded-lg" 
            required 
          />
        </div>
        
        <input 
          type="text" 
          name="channelname" 
          placeholder="User Name" 
          value={formData.channelname} 
          onChange={(e) => setFormData({ ...formData, channelname: e.target.value })} 
          className="w-full p-3 mb-4 border rounded-lg" 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          className="w-full p-3 mb-4 border rounded-lg" 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
          className="w-full p-3 mb-4 border rounded-lg" 
          required 
        />
        
        <div className="w-full mb-4">
          <input 
            type="file" 
            name="avatar" 
            onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })} 
            className="w-full p-3 text-sm cursor-pointer border rounded-lg bg-white" 
            required 
          />
        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm text-center mb-4">{errorMessage}</div>
        )}

        {loading && (
          <div className="text-center text-blue-500 my-4">Loading...</div>
        )}

        <button 
          type="submit" 
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed" 
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default Register;
