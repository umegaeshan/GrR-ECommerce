import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', { 
        name, 
        email, 
        password 
      });
      
      // මෙතන තිබුණ localStorage.setItem(...) පේළිය අනිවාර්යයෙන්ම අයින් කළ යුතුයි!
      // එසේ නොකළහොත් Register වූ ගමන් පද්ධතිය ඔහුව Logged In කෙනෙක් ලෙස සලකයි.

      alert('සාර්ථකව ලියාපදිංචි වුණා! කරුණාකර දැන් Login වෙන්න.');
      navigate('/login'); // කෙලින්ම Login පිටුවට යවනවා
      
    } catch (error) {
      alert(error.response?.data?.message || 'ලියාපදිංචි වීම අසාර්ථකයි!');
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-white p-8 rounded-xl shadow-md w-96 border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">ලියාපදිංචි වන්න</h2>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">නම (Name)</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-gray-900" 
              placeholder="ඔබේ නම"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">ඊමේල් (Email)</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-gray-900" 
              placeholder="Email ලිපිනය"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">මුරපදය (Password)</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-gray-900" 
              placeholder="මුරපදය"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="w-full bg-gray-900 text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition">
            Register
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          දැනටමත් ගිණුමක් තිබේද? <Link to="/login" className="text-blue-600 hover:underline">Login වෙන්න</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;