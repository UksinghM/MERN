import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#131921] text-white px-4 pt-12 pb-6 mt-10">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid gap-10 row-gap-8 mb-8 md:grid-cols-4">
          {/* Logo and About */}
          <div>
            <a href="/" className="inline-flex items-center mb-4">
              <svg
                className="w-10 h-10 text-yellow-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="10" />
                <text x="12" y="17" textAnchor="middle" fontSize="10" fill="#131921">ASHU</text>
              </svg>
              <span className="ml-3 text-2xl font-bold tracking-wide">ASHU</span>
            </a>
            <p className="text-gray-300 text-sm">
              Your one-stop solution for all your needs. We deliver quality and trust.
            </p>
          </div>
          {/* Links */}
          <div>
            <p className="font-semibold mb-2 text-yellow-400">Company</p>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-400">About Us</a></li>
              <li><a href="#" className="hover:text-yellow-400">Careers</a></li>
              <li><a href="#" className="hover:text-yellow-400">Blog</a></li>
              <li><a href="#" className="hover:text-yellow-400">Press</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2 text-yellow-400">Support</p>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-400">Contact</a></li>
              <li><a href="#" className="hover:text-yellow-400">Help Center</a></li>
              <li><a href="#" className="hover:text-yellow-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-yellow-400">Terms</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2 text-yellow-400">Follow Us</p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-yellow-400">
                <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6
                  c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1
                  C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1
                  c0.6,2,2.4,3.4,4.6,3.4c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14
                  c0-0.2,0-0.4,0-0.6C22.5,6.4,23.3,5.5,24,4.6z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-yellow-400">
                <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 30 30">
                  <circle cx="15" cy="15" r="4" />
                  <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10
                  C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1
                  c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-yellow-400">
                <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788
                  c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22
                  c1.105,0,2-0.895,2-2V2C24,0.895,23.105,0,22,0z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} ASHU Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-yellow-400 text-sm">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400 text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;