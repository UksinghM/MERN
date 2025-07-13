'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const DescriptionPage = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      {/* Blurred background image */}
      <img
        src="https://cdn.shopify.com/s/files/1/0561/7926/1589/files/Lucknowi_Chikankari_Kurtis_480x480.png?v=1715924883"
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover blur-lg brightness-75"
        style={{ zIndex: 0, minHeight: '100vh', minWidth: '100vw' }}
      />
      {/* Overlay content */}
      <div className="relative z-10 bg-white bg-opacity-80 rounded-2xl shadow-xl p-4 sm:p-10 w-[95vw] max-w-2xl text-center">
        <h1 className="text-2xl sm:text-4xl font-bold text-purple-800 mb-4 break-words">
          Welcome to ASHU Product Board
        </h1>
        <p className="text-sm sm:text-lg text-gray-700 mb-6 break-words">
          Discover and manage your shopping list, explore artisans, and find the best deals on a variety of products.
          Click "Start" to enter the main product board and begin your journey!
        </p>
        <button
          className="bg-purple-700 text-white px-6 py-3 rounded-lg text-base sm:text-xl font-semibold hover:bg-purple-900 transition w-full sm:w-auto"
          onClick={() => router.push('/')}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default DescriptionPage;