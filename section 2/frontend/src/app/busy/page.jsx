'use client';
import React, { useEffect, useState } from 'react';

function getTodoListProducts() {
  try {
    const list = localStorage.getItem('shoppingList');
    return list ? JSON.parse(list) : [];
  } catch {
    return [];
  }
}

const BusyPage = () => {
  const [busyProducts, setBusyProducts] = useState([]);

  useEffect(() => {
    // Only get local todo-list products
    const todoProducts = getTodoListProducts();
    // Only show products marked as Busy
    const busy = todoProducts.filter(item => item.status === "Busy");
    setBusyProducts(busy);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-center font-bold text-3xl mt-5 mb-8">Your Busy Products</h1>
      <div className="container mx-auto max-w-6xl">
        {busyProducts.length === 0 ? (
          <p className="text-gray-400 mb-4">No busy products currently.</p>
        ) : (
          <div className="flex overflow-x-auto gap-6 pt-4 pb-2">
            {busyProducts.map((item) => (
              <div
                key={item.id}
                className="min-w-[250px] max-w-xs bg-yellow-50 border border-yellow-400 shadow rounded-xl p-4 flex-shrink-0 flex flex-col justify-between"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded mb-2"
                  onError={e => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150?text=No+Image"; }}
                />
                <div className="flex-1">
                  <div className="text-lg font-semibold text-gray-800">{item.name}</div>
                  <div className="text-sm text-gray-600">{item.brand}</div>
                  <div className="text-xl font-bold text-yellow-700 mt-1">₹{item.price}</div>
                  <div className="text-blue-700 text-sm">Count: {item.count}</div>
                  <div className="text-xs mt-1">Status: <span className="text-yellow-600">Busy</span></div>
                  <div className="mt-2 text-xs text-yellow-700">
                    <div><b>Name:</b> {item.busyDetails?.name}</div>
                    <div><b>Phone:</b> {item.busyDetails?.phone}</div>
                    <div><b>Address:</b> {item.busyDetails?.address}</div>
                    <div><b>Busy Time:</b> {item.busyDetails?.busyTime}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusyPage;