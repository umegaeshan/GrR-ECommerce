import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // Input fields වල දත්ත මතක තියාගන්න
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // පිටු අතර මාරු වීමට navigate භාවිතා කරයි
  const navigate = useNavigate();

  // Login බොත්තම එබූ විට ක්‍රියාත්මක වන function එක
  const submitHandler = async (e) => {
    e.preventDefault(); // Form එක submit වෙද්දී පිටුව රීලෝඩ් වෙන එක නවත්වනවා
    setError(''); // පරණ දෝෂ තියෙනවා නම් ඒවා මකා දමනවා

    try {
      // Backend එකට දත්ත යැවීම
      const response = await axios.post('http://localhost:5000/api/users/login', {
        name,
        password
      });

      // සාර්ථකව ලොගින් වුණාම ආපු දත්ත ටික බ්‍රව්සර් එකේ සේව් කරගන්නවා
      localStorage.setItem('userInfo', JSON.stringify(response.data));

      // ඊට පස්සේ කෙලින්ම Home පිටුවට යවනවා
      navigate('/');
      
    } catch (err) {
      // මොනවා හරි වැරදුණොත් (උදා: මුරපදය වැරදි නම්) ඒ දෝෂය පෙන්වනවා
      setError(err.response?.data?.message || 'ලොගින් වීම අසාර්ථකයි!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">ලොගින් වන්න</h2>
        
        {/* දෝෂයක් ආවොත් රතු පාටින් පෙන්වන කොටස */}
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</div>}

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">නම</label>
            <input 
              type="text" 
              placeholder="ඔබේ නම ඇතුළත් කරන්න" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              required 
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">මුරපදය</label>
            <input 
              type="password" 
              placeholder="මුරපදය ඇතුළත් කරන්න" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;