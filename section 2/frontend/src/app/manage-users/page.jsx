'use client';
import React, { useEffect, useState } from 'react';

const ManageUsers = () => {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const savedList = localStorage.getItem('shoppingList');
    if (savedList) {
      setShoppingList(JSON.parse(savedList));
    }
  }, []);

  // Accept or Deliver product
  const updateOrderStatus = (index, status) => {
    const updatedList = shoppingList.map((item, i) =>
      i === index ? { ...item, orderStatus: status } : item
    );
    setShoppingList(updatedList);
    localStorage.setItem('shoppingList', JSON.stringify(updatedList));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-center font-bold text-3xl mt-5">Manage Orders</h1>
      <div className="container mx-auto bg-white rounded-2xl max-w-lg mt-8 p-5">
        {shoppingList.length === 0 ? (
          <p className="text-gray-500">No products to manage.</p>
        ) : (
          shoppingList.map((item, index) => (
            <div key={index} className="flex justify-between items-center border p-3 rounded-2xl mb-2">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/64?text=No+Image";
                  }}
                />
                <div>
                  <span className="block text-xl font-semibold">{item.name}</span>
                  <span className="block text-gray-600">Brand: {item.brand}</span>
                  <span className="block text-green-700">₹{item.price}</span>
                  <span className="block text-blue-700">Count: {item.count}</span>
                  <span className="block mt-1">
                    Order Status:{" "}
                    <span className={
                      item.orderStatus === "Delivered"
                        ? "text-green-600"
                        : item.orderStatus === "Accepted"
                        ? "text-yellow-600"
                        : "text-gray-600"
                    }>
                      {item.orderStatus || "Pending"}
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700"
                  onClick={() => updateOrderStatus(index, "Accepted")}
                  disabled={item.orderStatus === "Accepted" || item.orderStatus === "Delivered"}
                >
                  Accept
                </button>
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-800"
                  onClick={() => updateOrderStatus(index, "Delivered")}
                  disabled={item.orderStatus !== "Accepted" || item.orderStatus === "Delivered"}
                >
                  Delivered
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
