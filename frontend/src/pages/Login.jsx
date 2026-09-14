import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const API_URL = 'https://grr-backend.onrender.com';

  // 1. සාමාන්‍ය Login ක්‍රියාවලිය (Username/Name හරහා)
  const handleNormalLogin = async (e) => {
    e.preventDefault();
    try {
      // Backend එකට name සහ password පමණක් යවයි
      const response = await axios.post(`${API_URL}/api/users/login`, { name, password });
      
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      alert('Successfully logged in!');
      
      if (response.data.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/'); 
      }
      
    } catch (error) {
      alert(error.response?.data?.message || 'Invalid Name or Password!');
    }
  };

  // 2. Google Login සාර්ථක වූ විට
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/google`, {
        token: credentialResponse.credential,
      });
      
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      alert('Successfully logged in with Google!');
      
      if (response.data.isAdmin) {
        window.location.href = '/admin'; 
      } else {
        window.location.href = '/'; 
      }
      
    } catch (error) {
      alert('Google login failed!');
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh] pt-40">
      <div className="bg-white p-8 rounded-xl shadow-md w-96 border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        
        <form onSubmit={handleNormalLogin} className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-gray-900" 
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-gray-900" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="w-full bg-gray-900 text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition">
            Login
          </button>
          <div className="mt-6 text-center text-sm">
            Create New Account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          </div>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              alert('Google login failed!');
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default Login;
