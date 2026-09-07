import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  // 1. සියලුම State Hooks අනිවාර්යයෙන්ම උඩින්ම තියන්න ඕනේ
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');

  // 2. ඊට පස්සේ තමයි Admin ද කියලා බලන Condition එක දාන්නේ
  if (!user || !user.isAdmin) {
    return (
      <div className="text-center p-10 mt-10">
        <h2 className="text-2xl text-red-600 font-bold">Access Denied!</h2>
        <button onClick={() => navigate('/')} className="mt-4 bg-gray-900 text-white px-4 py-2 rounded">
          Home Page
        </button>
      </div>
    );
  }

  // භාණ්ඩය Database එකට යවන Function එක
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Admin ගේ Token එක යවන්න Headers හදාගන්නවා
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // Backend එකට Data යවනවා
      await axios.post(
        'http://localhost:5000/api/products',
        { name, description, price: Number(price), image, category, countInStock: Number(countInStock) },
        config
      );

      alert('Product added successfully!');
      
      // Form එක හිස් කරනවා
      setName('');
      setDescription('');
      setPrice('');
      setImage('');
      setCategory('');
      setCountInStock('');
      
    } catch (error) {
      alert('Failed to add product!');
      console.error(error);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans min-h-[75vh]">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">Admin Mode</span>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Add New Product</h2>
        
        <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Product Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 border rounded focus:outline-none focus:border-gray-900" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Price (LKR)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full px-3 py-2 border rounded focus:outline-none focus:border-gray-900" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Image URL</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required className="w-full px-3 py-2 border rounded focus:outline-none focus:border-gray-900" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full px-3 py-2 border rounded focus:outline-none focus:border-gray-900" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Stock</label>
            <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required className="w-full px-3 py-2 border rounded focus:outline-none focus:border-gray-900" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" required className="w-full px-3 py-2 border rounded focus:outline-none focus:border-gray-900"></textarea>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;