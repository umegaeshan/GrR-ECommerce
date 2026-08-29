import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ලොගින් වුණාම වෙනත් පිටුවකට යවන්න

  // 1. සාමාන්‍ය Login ක්‍රියාවලිය
  const handleNormalLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { name, password });
      
      // ආපු Token එක සහ විස්තර Browser එකේ සේව් කරනවා
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      alert('සාර්ථකව ලොගින් වුණා!');
      navigate('/'); // Home පිටුවට යවනවා
    } catch (error) {
      alert('නම හෝ මුරපදය වැරදියි!');
    }
  };

  // 2. Google Login සාර්ථක වූ විට
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/google', {
        token: credentialResponse.credential, // Google එකෙන් දෙන token එක Backend එකට යවනවා
      });
      
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      alert('Google හරහා සාර්ථකව ලොගින් වුණා!');
      navigate('/');
    } catch (error) {
      alert('Google ලොගින් වීම අසාර්ථකයි!');
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-white p-8 rounded-xl shadow-md w-96 border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        
        {/* සාමාන්‍ය Login Form එක */}
        <form onSubmit={handleNormalLogin} className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-gray-900" 
              placeholder="ඔබේ නම ඇතුළත් කරන්න"
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
              placeholder="මුරපදය ඇතුළත් කරන්න"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="w-full bg-gray-900 text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition">
            Login
          </button>
        </form>

        {/* Google සහ සාමාන්‍ය Login වෙන් කරන ඉර */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">හෝ</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Login Button එක */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              alert('Google Login අසාර්ථකයි');
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default Login;