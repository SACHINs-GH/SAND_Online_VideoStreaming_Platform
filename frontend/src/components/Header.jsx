import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearAuth } from '../features/authSlice';
import { setSearchedData } from '../features/seachesdData.js'
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state)=>state.auth.accessToken)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [searchInput, setSearchInput] = useState('');

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        "http://localhost:5000/user/logout",
        {},
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch(clearAuth()); 
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        alert("User Logout Successfully");
        navigate('/login');
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to log out. Please try again.");
    }
  };
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/user/search", 
        { content: searchInput },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      dispatch(setSearchedData({ searchedData: response.data }));
      navigate('/search');
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Failed to retrieve search results.");
    }
  };
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md h-16">
      {/* Logo */}
      <div className="flex items-center justify-center p-3 w-1/6">
        <img src="./src/assets/images/SAND.png" alt="logo" height={50} width={50} />
      </div>

      {/* Search Bar */}
      <div className="flex items-center w-1/2">
        <form onSubmit={handleSearchSubmit} className="flex w-full">
          <input
            type="text"
            placeholder="Search"
            className="p-2 w-full text-center border border-gray-300 rounded-l-full focus:outline-none text-lg"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="p-2.5 bg-blue-300 border-l border-gray-300 rounded-r-full">
            <img src="./src/assets/svgs/search.png" alt="search" height={28} width={28} />
          </button>
        </form>
      </div>

      {/* User Info or Login Button */}
      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-sm">{user.fullname}</span>
          <div className="h-10 w-10 rounded-full bg-gray-400 overflow-hidden">
            {!user ? (
                <Link to="/login"/>
            ) : (
              <Link to="/profile">
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />            
              </Link>
            )}            
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
            Login
          </button>
        </Link>
      )}
    </div>
  );
}

export default Header;
