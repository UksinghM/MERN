'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [catName, setCatName] = useState('');
  const [product, setProduct] = useState({
    name: '', brand: '', price: '', count: '', type: '', image: ''
  });
  const fileInputRef = useRef();

  const defaultCategories = [
    "Book",
    "Shoes",
    "T-shirt",
    "Clothes",
    "Electronics",
    "Grocery",
    "Other"
  ];

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories').then(res => setCategories(res.data));
    axios.get('http://localhost:5000/api/products').then(res => setProducts(res.data));
  }, []);

  const handleAddCategory = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/categories', { name: catName })
      .then(res => {
        setCategories([...categories, res.data]);
        setCatName('');
      });
  };

  const handleProductUpload = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/products', product)
      .then(res => {
        setProducts([...products, res.data]);
        setProduct({ name: '', brand: '', price: '', count: '', type: '', image: '' });
      });
  };

  // Handle file upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    // Adjust the URL if your backend runs on a different port
    const res = await axios.post('http://localhost:5000/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setProduct(p => ({ ...p, image: res.data.url }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Admin Panel</h1>
        {/* Add Category */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Add Category</h2>
          <form onSubmit={handleAddCategory} className="flex gap-2">
            <input
              type="text"
              value={catName}
              onChange={e => setCatName(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Category name"
              required
            />
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Add</button>
          </form>
          {/* Quick Add Default Categories */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="font-semibold">Quick Add: </span>
            {defaultCategories.map(cat => (
              <button
                key={cat}
                type="button"
                className="bg-gray-200 hover:bg-purple-200 text-gray-700 px-3 py-1 rounded text-sm"
                onClick={() => setCatName(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <span className="font-semibold">Categories: </span>
            {categories.length === 0 ? (
              <span className="text-gray-400">No categories yet.</span>
            ) : (
              <span className="text-gray-700">{categories.map(c => c.name).join(', ')}</span>
            )}
          </div>
        </div>
        {/* Upload Product */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Upload Product</h2>
          <form onSubmit={handleProductUpload} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Product Name</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                required
                value={product.name}
                onChange={e => setProduct(p => ({ ...p, name: e.target.value }))}
                placeholder="Name"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Brand</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                required
                value={product.brand}
                onChange={e => setProduct(p => ({ ...p, brand: e.target.value }))}
                placeholder="Brand"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Price</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                required
                value={product.price}
                onChange={e => setProduct(p => ({ ...p, price: e.target.value }))}
                placeholder="Price"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Count</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                required
                value={product.count}
                onChange={e => setProduct(p => ({ ...p, count: e.target.value }))}
                placeholder="Count"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Category</label>
              <select
                className="w-full border p-2 rounded"
                required
                value={product.type}
                onChange={e => setProduct(p => ({ ...p, type: e.target.value }))}
              >
                <option value="">Select Category</option>
                <option value="Book">Book</option>
                <option value="Shoes">Shoes</option>
                <option value="T-shirt">T-shirt</option>
                <option value="Clothes">Clothes</option>
                <option value="Electronics">Electronics</option>
                <option value="Grocery">Grocery</option>
                <option value="Mobile">Mobile</option>
                <option value="Laptop">Laptop</option>
                <option value="Accessories">Accessories</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Image Upload</label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="w-full border p-2 rounded bg-white"
                onChange={handleImageUpload}
              />
              {product.image && (
                <img src={product.image} alt="Preview" className="h-16 mt-2 rounded" />
              )}
            </div>
            <div className="sm:col-span-2">
              <button className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mt-2">Upload Product</button>
            </div>
          </form>
        </div>
        {/* Product List */}
        <div>
          <h2 className="text-xl font-semibold mb-2">All Products</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-purple-100">
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Brand</th>
                  <th className="p-2 border">Category</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Count</th>
                  <th className="p-2 border">Image</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id}>
                    <td className="p-2 border">{p.name}</td>
                    <td className="p-2 border">{p.brand}</td>
                    <td className="p-2 border">{p.type}</td>
                    <td className="p-2 border">{p.price}</td>
                    <td className="p-2 border">{p.count}</td>
                    <td className="p-2 border">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="h-10 w-10 object-cover rounded" />
                      ) : (
                        <span className="text-gray-400">No image</span>
                      )}
                    </td>
                    <td className="p-2 border">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                        onClick={async () => {
                          await axios.delete(`http://localhost:5000/api/products/${p._id}`);
                          setProducts(products.filter(prod => prod._id !== p._id));
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
              <div className="text-center text-gray-400 py-4">No products uploaded yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;