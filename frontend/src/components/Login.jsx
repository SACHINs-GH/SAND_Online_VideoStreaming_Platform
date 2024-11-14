import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAuth } from '../features/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:5000/user/login', form, {
      withCredentials: true,
    });
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    dispatch(setAuth({
      user: response.data.user,
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    }));
    alert(`Welcome ${response.data.user.fullname}`);
    navigate('/');
  } catch (error) {
    alert(error.response?.data?.message || 'Login failed. Please try again.');
  }
};
return (
  <div
    className="relative flex justify-center items-center h-screen bg-cover bg-center"
    style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1728827098446-a77f1c54ac74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8')`,
    }}
  >
    <form
      onSubmit={handleSubmit}
      className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md p-8 rounded-xl shadow-lg w-11/12 max-w-md md:max-w-lg lg:max-w-xl"
      style={{ maxWidth: '400px' }}
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Sign in to Website</h1>


      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
        required
      />

      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
      >
        Sign in
      </button>

      <div className="flex justify-center text-sm text-gray-600 mt-4">
        <span>Don't have an account? </span>
        <Link to="/register" className="text-blue-600 hover:underline ml-1">
          Sign Up now
        </Link>
      </div>
    </form>
  </div>
);
};

export default Login;
