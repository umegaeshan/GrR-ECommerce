import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  // පිටුව ලෝඩ් වෙද්දීම LocalStorage එකේ තියෙන Cart එක හිස් කරනවා
  useEffect(() => {
    localStorage.removeItem('cartItems');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 font-sans">
      <div className="bg-white p-10 rounded-2xl shadow-lg border border-green-100 max-w-md w-full">
        {/* හරි ලකුණ (Checkmark) */}
        <div className="text-green-500 text-7xl mb-4 flex justify-center">
          <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        
        <h2 className="text-3xl font-extrabold text-gray-800 mb-3">Payment Successful!</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Your order has been placed successfully. Your items will be delivered to you shortly. Thank you for choosing us!
        </p>
        
        <Link 
          to="/" 
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 shadow-md"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Success;