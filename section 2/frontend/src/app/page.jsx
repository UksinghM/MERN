'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const SUGGESTIONS_PER_LOAD = 10;
const categories = ["Shoe", "T-shirt", "Electronics", "Book", "Grocery", "Other"];

function getTodoListProducts() {
  try {
    const list = localStorage.getItem('shoppingList');
    return list ? JSON.parse(list) : [];
  } catch {
    return [];
  }
}

const Page = () => {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(initialSearch);
  const [filterCategory, setFilterCategory] = useState('');

  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [showBusyForm, setShowBusyForm] = useState(false);
  const [busyProductIndex, setBusyProductIndex] = useState(null);
  const [busyInfo, setBusyInfo] = useState({
    name: '',
    phone: '',
    address: '',
    busyTime: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        const backendProducts = res.data;
        const todoProducts = getTodoListProducts();
        // Ensure all products have the same structure
        const normalizedTodo = todoProducts.map(p => ({
          ...p,
          id: p.id || `local-${Math.random().toString(36).substr(2, 9)}`,
          status: p.status || 'Available'
        }));
        const combined = [...backendProducts, ...normalizedTodo];
        setAllProducts(combined);
        setVisibleProducts(combined.slice(0, SUGGESTIONS_PER_LOAD));
        setHasMore(combined.length > SUGGESTIONS_PER_LOAD);
      })
      .catch(() => {
        const todoProducts = getTodoListProducts();
        setAllProducts(todoProducts);
        setVisibleProducts(todoProducts.slice(0, SUGGESTIONS_PER_LOAD));
        setHasMore(todoProducts.length > SUGGESTIONS_PER_LOAD);
      });
  }, []);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        hasMore
      ) {
        const next = visibleProducts.length + SUGGESTIONS_PER_LOAD;
        setVisibleProducts(allProducts.slice(0, next));
        setHasMore(next < allProducts.length);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleProducts, hasMore, allProducts]);

  // Group by category
  const productsByCategory = categories.map(category => ({
    category,
    products: visibleProducts.filter(item => item.type === category)
  }));

  const handleBusyClick = (index) => {
    setBusyProductIndex(index);
    setShowBusyForm(true);
    setBusyInfo({ name: '', phone: '', address: '', busyTime: '' });
  };

  const handleBusySubmit = async (e) => {
    e.preventDefault();
    const product = allProducts[busyProductIndex];
    try {
      await fetch('http://localhost:5000/api/product-busy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          name: busyInfo.name,
          phone: busyInfo.phone,
          address: busyInfo.address,
          busyTime: busyInfo.busyTime
        })
      });
      // Optionally update UI as before
      const updatedProducts = [...allProducts];
      updatedProducts[busyProductIndex] = {
        ...updatedProducts[busyProductIndex],
        status: 'Busy',
        busyDetails: { ...busyInfo }
      };
      setAllProducts(updatedProducts);
      setVisibleProducts(updatedProducts.slice(0, visibleProducts.length));
      setShowBusyForm(false);

      // Update localStorage if it's a local product
      if (updatedProducts[busyProductIndex].id?.startsWith('local-')) {
        const localProducts = updatedProducts.filter(p => p.id?.startsWith('local-'));
        localStorage.setItem('shoppingList', JSON.stringify(localProducts));
      }
    } catch (err) {
      alert('Failed to mark as busy. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center sm:text-left">
        Product Board
      </h1>
      <div className="container mx-auto px-2 sm:px-4 max-w-6xl">
        {/* Responsive filter row */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 w-full">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="border border-gray-300 p-3 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Shoe">Shoe</option>
            <option value="T-shirt">T-shirt</option>
            <option value="Electronics">Electronics</option>
            <option value="Book">Book</option>
            <option value="Grocery">Grocery</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Responsive product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {visibleProducts
            .filter(item =>
              (filterCategory ? item.type === filterCategory : true) &&
              (search
                ? item.name.toLowerCase().includes(search.toLowerCase()) ||
                  item.brand.toLowerCase().includes(search.toLowerCase())
                : true) &&
              item.status !== "Busy"
            )
            .map((item, index) => (
              <div
                key={item.id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                  onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-gray-600 mb-1">{item.brand} • {item.type}</p>
                    <p className="font-bold text-purple-700 mb-1">₹{item.price}</p>
                    <p className="text-blue-700 text-sm mb-1">Count: {item.count}</p>
                    <p className="text-xs mt-1">
                      Status: <span className={
                        item.status === "Sold"
                          ? "text-red-600"
                          : item.status === "Busy"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }>{item.status || "Available"}</span>
                    </p>
                  </div>
                  {item.status === "Busy" && item.busyDetails && (
                    <div className="mt-2 text-xs text-yellow-700">
                      <div><b>Name:</b> {item.busyDetails.name}</div>
                      <div><b>Phone:</b> {item.busyDetails.phone}</div>
                      <div><b>Address:</b> {item.busyDetails.address}</div>
                      <div><b>Busy Time:</b> {item.busyDetails.busyTime}</div>
                    </div>
                  )}
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 text-sm mt-2"
                    onClick={() => handleBusyClick(index)}
                    disabled={item.status === "Sold" || item.status === "Busy"}
                  >
                    Busy
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Responsive footer or additional content */}
        <div className="mt-8 text-center sm:text-left">
          <p className="text-gray-500">
            Showing results for {search || 'all products'}
          </p>
        </div>

        {/* Busy modal (unchanged) */}
        {showBusyForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <form
              onSubmit={handleBusySubmit}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-lg flex flex-col gap-3 w-[90vw] max-w-md"
            >
              <h2 className="text-xl font-bold mb-2">Mark as Busy</h2>
              <input
                type="text"
                placeholder="Your Name"
                className="border p-2 rounded"
                value={busyInfo.name}
                onChange={e => setBusyInfo({ ...busyInfo, name: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="border p-2 rounded"
                value={busyInfo.phone}
                onChange={e => setBusyInfo({ ...busyInfo, phone: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Address"
                className="border p-2 rounded"
                value={busyInfo.address}
                onChange={e => setBusyInfo({ ...busyInfo, address: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Busy Time (e.g. 2pm-4pm)"
                className="border p-2 rounded"
                value={busyInfo.busyTime}
                onChange={e => setBusyInfo({ ...busyInfo, busyTime: e.target.value })}
                required
              />
              <div className="flex gap-2 mt-2">
                <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">Submit</button>
                <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setShowBusyForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;