import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">GrR E-Commerce</h3>
          <p className="text-sm">Beyond the Limits. The highest quality games and modern goods you need in one place.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Links</h3>
          <ul className="flex flex-col gap-2">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
          <p className="text-sm">Email: support@grr.com</p>
          <p className="text-sm">Phone: +94 77 123 4567</p>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} GrR E-Commerce. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;