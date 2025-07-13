'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-gradient-to-r from-purple-700 via-pink-500 to-yellow-400 text-white px-3 sm:px-6 py-2 shadow-lg sticky top-0 z-50">
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-2 md:gap-4 min-w-0 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer min-w-0" onClick={() => router.push('/')}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png"
            alt="ASHU"
            className="h-7 w-7"
          />
          <span className="font-bold text-xl tracking-wide drop-shadow truncate">ASHU</span>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-wrap gap-2 sm:gap-3 md:gap-4 items-center justify-center overflow-x-auto py-1 min-w-0">
          <a href="/" className="hover:text-yellow-200 font-semibold transition whitespace-nowrap text-base">Home</a>
          <a href="/artisans" className="hover:text-yellow-200 font-semibold transition whitespace-nowrap text-base">Artisans</a>
          <a href="/todo-list" className="hover:text-yellow-200 font-semibold transition whitespace-nowrap text-base">Todo List</a>
          {/* Product Varieties Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="hover:text-yellow-200 font-semibold flex items-center gap-1 transition whitespace-nowrap text-base">
              Product Varieties
              <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showDropdown && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10">
                <a href="/products/electronics" className="block px-4 py-2 hover:bg-yellow-100 text-base">Electronics</a>
                <a href="/products/groceries" className="block px-4 py-2 hover:bg-yellow-100 text-base">Groceries</a>
                <a href="/products/clothes" className="block px-4 py-2 hover:bg-yellow-100 text-base">Clothes</a>
                <a href="/products/books" className="block px-4 py-2 hover:bg-yellow-100 text-base">Books</a>
                <hr className="my-1"/>
                <a href="/discounts" className="block px-4 py-2 text-green-700 font-semibold hover:bg-green-100 text-base">
                  Discounts & Offers
                </a>
                <a href="/payments" className="block px-4 py-2 text-blue-700 font-semibold hover:bg-blue-100 text-base">
                  Payment Options
                </a>
                <a href="/card-offers" className="block px-4 py-2 text-purple-700 font-semibold hover:bg-purple-100 text-base">
                  Card Offers
                </a>
              </div>
            )}
          </div>
          <a href="/busy" className="hover:text-yellow-200 font-semibold transition whitespace-nowrap text-base">Busy</a>
          <a href="/help" className="hover:text-purple-900 font-semibold transition whitespace-nowrap text-base">Help</a>
          <a href="/admin" className="hover:text-yellow-200 font-semibold transition whitespace-nowrap text-base">Admin</a>
        </div>

        {/* Search Bar */}
        <form
          action="/"
          method="GET"
          className="flex w-full md:w-auto max-w-xs mt-2 md:mt-0"
        >
          <input
            type="text"
            name="search"
            placeholder="Search ASHU"
            className="w-full px-3 py-2 rounded-l-md text-black bg-white focus:outline-none text-base"
          />
          <button className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-r-md" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-black"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </button>
        </form>

        {/* Right Side: Signup & Login & Cart */}
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <a href="/signup" className="hover:text-yellow-200 font-semibold transition whitespace-nowrap text-base">Signup</a>
          <a href="/login" className="hover:text-yellow-200 font-semibold transition whitespace-nowrap text-base">Login</a>
          <a href="/history" className="relative flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68l3.24-7.24A1 1 0 0020 8H6.21" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;