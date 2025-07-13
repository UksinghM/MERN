'use client';
import React, { useState, useEffect } from 'react';

const ShoppingList = () => {
  const [product, setProduct] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [count, setCount] = useState(1);
  const [type, setType] = useState('Shoe');
  const [shoppingList, setShoppingList] = useState([]);

  // Load products from localStorage on mount
  useEffect(() => {
    try {
      const list = localStorage.getItem('shoppingList');
      setShoppingList(list ? JSON.parse(list) : []);
    } catch {
      setShoppingList([]);
    }
  }, []);

  // Save products to localStorage whenever shoppingList changes
  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }, [shoppingList]);

  const addProduct = (e) => {
    e.preventDefault();
    if (product.trim() && price.trim() && brand.trim()) {
      const newProduct = {
        id: `local-${Date.now()}`,
        name: product,
        brand,
        price,
        image: image || 'https://via.placeholder.com/150?text=No+Image',
        count,
        type,
        status: 'Available'
      };
      const newList = [newProduct, ...shoppingList];
      setShoppingList(newList);

      // Reset form
      setProduct('');
      setBrand('');
      setPrice('');
      setImage('');
      setCount(1);
      setType('Shoe');
    }
  };

  const removeProduct = (id) => {
    const newList = shoppingList.filter(item => item.id !== id);
    setShoppingList(newList);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-violet-300 py-10">
      <h1 className="text-center font-bold text-3xl mt-5">Shopping List</h1>
      <div className="container mx-auto bg-white rounded-2xl max-w-lg p-5">
        {/* Form */}
        <form onSubmit={addProduct} className="mb-6 space-y-3">
          <input
            type="text"
            placeholder="Product Name"
            value={product}
            onChange={e => setProduct(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={e => setBrand(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={e => setImage(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border p-2 rounded w-full"
            />
            {(image && (
              <img
                src={image}
                alt="Preview"
                className="w-12 h-12 object-cover rounded"
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/64?text=No+Image";
                }}
              />
            ))}
          </div>
          <input
            type="number"
            placeholder="Count"
            value={count}
            min={1}
            onChange={e => setCount(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="Shoe">Shoe</option>
            <option value="T-shirt">T-shirt</option>
            <option value="Electronics">Electronics</option>
            <option value="Book">Book</option>
            <option value="Grocery">Grocery</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded w-full">
            Add Product
          </button>
        </form>
        {/* Product list display */}
        {shoppingList.map((item) => (
          <div key={item.id} className="flex justify-between items-center border p-3 rounded-2xl mb-2">
            <div>
              <div className="font-bold">{item.name}</div>
              <div className="text-sm text-gray-600">{item.brand} • {item.type}</div>
              <div className="text-sm text-gray-800">₹{item.price} x {item.count}</div>
            </div>
            <button
              onClick={() => removeProduct(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingList;