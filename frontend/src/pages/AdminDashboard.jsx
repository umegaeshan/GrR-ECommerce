import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const [activeTab, setActiveTab] = useState('addProduct');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  // Add/Edit Product Form States
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  
  // Edit කිරීම් හඳුනාගන්නා States
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  // User Edit Form States
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [editUserIsAdmin, setEditUserIsAdmin] = useState(false);

  if (!user || !user.isAdmin) {
    return (
      <div className="text-center p-10 mt-10">
        <h2 className="text-2xl text-red-600 font-bold">Access Denied!</h2>
        <button onClick={() => navigate('/')} className="mt-4 bg-gray-900 text-white px-4 py-2 rounded">Home Page</button>
      </div>
    );
  }

  const config = { headers: { Authorization: `Bearer ${user.token}` } };

  // Data Fetching
  const fetchProducts = () => axios.get('http://localhost:5000/api/products').then((res) => setProducts(res.data));
  const fetchUsers = () => axios.get('http://localhost:5000/api/users', config).then((res) => setUsers(res.data));

  useEffect(() => {
    if (activeTab === 'manageProducts') fetchProducts();
    if (activeTab === 'manageUsers') fetchUsers();
    
    // Tab එක මාරු වෙද්දී Edit වෙන එක cancel කරනවා
    setEditingProduct(null);
    setEditingUser(null);
  }, [activeTab]);

  // --- Products Functions ---
  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`, config);
        setProducts(products.filter((p) => p._id !== id));
        alert('Product deleted successfully!');
      } catch (error) {
        alert('Failed to delete product!');
      }
    }
  };

  const handleEditProductClick = (product) => {
    setEditingProduct(product._id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setImage(product.image);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };

  const submitProductHandler = async (e) => {
    e.preventDefault();
    try {
      const productData = { name, description, price: Number(price), image, category, countInStock: Number(countInStock) };
      
      if (editingProduct) {
        // Update Product
        await axios.put(`http://localhost:5000/api/products/${editingProduct}`, productData, config);
        alert('Product updated successfully!');
        setEditingProduct(null);
        fetchProducts(); // Fetch the updated product list
      } else {
        // Add Product
        await axios.post('http://localhost:5000/api/products', productData, config);
        alert('Product added successfully!');
      }
      
      setName(''); setDescription(''); setPrice(''); setImage(''); setCategory(''); setCountInStock('');
    } catch (error) {
      alert('Failed to add product!');
    }
  };

  // --- Users Functions ---
  const handleEditUserClick = (usr) => {
    setEditingUser(usr._id);
    setEditUserName(usr.name);
    setEditUserEmail(usr.email);
    setEditUserIsAdmin(usr.isAdmin);
  };

  const submitUserHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${editingUser}`, { 
        name: editUserName, email: editUserEmail, isAdmin: editUserIsAdmin 
      }, config);
      
      alert('User updated successfully!');
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      alert('Failed to update user!');
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans min-h-[75vh]">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">Admin Mode</span>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <button onClick={() => setActiveTab('addProduct')} className={`px-6 py-2 font-bold rounded-lg transition ${activeTab === 'addProduct' ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}>Add Product</button>
        <button onClick={() => setActiveTab('manageProducts')} className={`px-6 py-2 font-bold rounded-lg transition ${activeTab === 'manageProducts' ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}>Manage Products</button>
        <button onClick={() => setActiveTab('manageUsers')} className={`px-6 py-2 font-bold rounded-lg transition ${activeTab === 'manageUsers' ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}>Manage Users</button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        
        {/* 1. Add Product Tab */}
        {activeTab === 'addProduct' && (
          <div>
            <h2 className="text-xl font-bold mb-6 text-gray-700 border-b pb-2">Add New Product</h2>
            <form onSubmit={submitProductHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-gray-700 font-bold mb-2">Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 border rounded" /></div>
              <div><label className="block text-gray-700 font-bold mb-2">Price</label><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full px-3 py-2 border rounded" /></div>
              <div><label className="block text-gray-700 font-bold mb-2">Image URL</label><input type="text" value={image} onChange={(e) => setImage(e.target.value)} required className="w-full px-3 py-2 border rounded" /></div>
              <div><label className="block text-gray-700 font-bold mb-2">Category</label><input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full px-3 py-2 border rounded" /></div>
              <div><label className="block text-gray-700 font-bold mb-2">Count in Stock</label><input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required className="w-full px-3 py-2 border rounded" /></div>
              <div className="md:col-span-2"><label className="block text-gray-700 font-bold mb-2">Description</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" required className="w-full px-3 py-2 border rounded"></textarea></div>
              <div className="md:col-span-2"><button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded">Add Product</button></div>
            </form>
          </div>
        )}

        {/* 2. Manage Products Tab */}
        {activeTab === 'manageProducts' && (
          <div>
            <h2 className="text-xl font-bold mb-6 text-gray-700 border-b pb-2">Manage Products</h2>
            
            {/* භාණ්ඩ Edit කරන Form එක පෙන්වීම */}
            {editingProduct ? (
               <div className="mb-8 p-4 border-2 border-blue-200 bg-blue-50 rounded">
                 <h3 className="font-bold mb-4">Edit Product</h3>
                 <form onSubmit={submitProductHandler} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-sm font-bold">Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-2 py-1 border rounded" /></div>
                    <div><label className="text-sm font-bold">Price</label><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full px-2 py-1 border rounded" /></div>
                    <div><label className="text-sm font-bold">Image URL</label><input type="text" value={image} onChange={(e) => setImage(e.target.value)} required className="w-full px-2 py-1 border rounded" /></div>
                    <div><label className="text-sm font-bold">Count in Stock</label><input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required className="w-full px-2 py-1 border rounded" /></div>
                    <div className="flex gap-2 mt-4 md:col-span-2">
                      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold">Update</button>
                      <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-400 text-white px-4 py-2 rounded font-bold">Cancel</button>
                    </div>
                 </form>
               </div>
            ) : null}

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="p-3">Image</th><th className="p-3">Name</th><th className="p-3">Price</th><th className="p-3">Count in Stock</th><th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id} className="border-b hover:bg-gray-50">
                      <td className="p-3"><img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded shadow-sm" /></td>
                      <td className="p-3 font-bold text-gray-800">{product.name}</td>
                      <td className="p-3 text-green-600 font-bold">රු. {product.price}</td>
                      <td className="p-3">{product.countInStock}</td>
                      <td className="p-3 flex gap-2">
                        <button onClick={() => handleEditProductClick(product)} className="bg-blue-500 text-white px-3 py-1 rounded font-bold text-sm">Edit</button>
                        <button onClick={() => deleteProduct(product._id)} className="bg-red-500 text-white px-3 py-1 rounded font-bold text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Manage Users Tab */}
        {activeTab === 'manageUsers' && (
          <div>
            <h2 className="text-xl font-bold mb-6 text-gray-700 border-b pb-2">Manage Users</h2>
            
            {/* User Edit කරන Form එක පෙන්වීම */}
            {editingUser ? (
               <div className="mb-8 p-4 border-2 border-yellow-200 bg-yellow-50 rounded">
                 <h3 className="font-bold mb-4">Edit User</h3>
                 <form onSubmit={submitUserHandler} className="flex flex-wrap gap-4 items-end">
                    <div><label className="text-sm font-bold block">Name</label><input type="text" value={editUserName} onChange={(e) => setEditUserName(e.target.value)} required className="px-2 py-1 border rounded" /></div>
                    <div><label className="text-sm font-bold block">Email</label><input type="email" value={editUserEmail} onChange={(e) => setEditUserEmail(e.target.value)} required className="px-2 py-1 border rounded" /></div>
                    <div className="flex items-center mb-2">
                      <input type="checkbox" checked={editUserIsAdmin} onChange={(e) => setEditUserIsAdmin(e.target.checked)} className="mr-2" />
                      <label className="font-bold">Grant Admin Privileges</label>
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold h-fit">Update</button>
                    <button type="button" onClick={() => setEditingUser(null)} className="bg-gray-400 text-white px-4 py-2 rounded font-bold h-fit">Cancel</button>
                 </form>
               </div>
            ) : null}

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Admin?</th><th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-bold text-gray-800">{u.name}</td>
                      <td className="p-3 text-gray-600">{u.email}</td>
                      <td className="p-3">{u.isAdmin ? <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">Yes</span> : <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-bold">No</span>}</td>
                      <td className="p-3">
                        <button onClick={() => handleEditUserClick(u)} className="bg-blue-500 text-white px-3 py-1 rounded font-bold text-sm">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;