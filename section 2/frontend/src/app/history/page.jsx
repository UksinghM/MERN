'use client';
import React, { useEffect, useState } from 'react';

const History = () => {
  const [soldProducts, setSoldProducts] = useState([]);

  useEffect(() => {
    const savedList = localStorage.getItem('shoppingList');
    if (savedList) {
      const all = JSON.parse(savedList);
      setSoldProducts(all.filter(item => item.status === "Sold"));
    }
  }, []);

  return (
    <div className="min-h-screen bg-green-50 py-10">
      <h1 className="text-center font-bold text-3xl mt-5 text-green-700">Shopping History</h1>
      <div className="container mx-auto bg-white rounded-2xl max-w-lg mt-8 p-5">
        {soldProducts.length === 0 ? (
          <p className="text-gray-500">No shopping history yet.</p>
        ) : (
          soldProducts.map((item, index) => (
            <div key={index} className="flex justify-between items-center border p-3 rounded-2xl mb-2">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/64?text=No+Image";
                  }}
                />
                <div>
                  <span className="block text-xl font-semibold">{item.name}</span>
                  <span className="block text-purple-700">Type: {item.type}</span>
                  <span className="block text-gray-600">Brand: {item.brand}</span>
                  <span className="block text-green-700">₹{item.price}</span>
                  <span className="block text-blue-700">Count: {item.count}</span>
                  {item.userInfo && (
                    <div className="mt-2 text-xs text-gray-700">
                      <div><b>Name:</b> {item.userInfo.name}</div>
                      <div><b>Phone:</b> {item.userInfo.phone}</div>
                      <div><b>Address:</b> {item.userInfo.address}</div>
                      {item.userInfo.location && (
                        <div>
                          <b>Location:</b> <a href={`https://maps.google.com/?q=${item.userInfo.location}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;