'use client';
import React from 'react';

const Help = () => (
  <div className="min-h-screen bg-gray-100 py-10">
    <div className="container mx-auto max-w-2xl bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Help & Support</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-purple-600 mb-2">Contact Us</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>
            <b>Message:</b> <a href="mailto:support@yourwebsite.com" className="text-blue-600 underline">support@yourwebsite.com</a>
          </li>
          <li>
            <b>Phone:</b> <a href="tel:+917607367197" className="text-blue-600 underline">+91 7607367197</a>
          </li>
          <li>
            <b>WhatsApp:</b> <a href="https://wa.me/917607367197" className="text-green-600 underline" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
          </li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-purple-600 mb-2">Job & Product Related Issues</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>For job or product issues, please reach out using the contact details above.</li>
          <li>Describe your issue clearly for faster resolution.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-purple-600 mb-2">Discounts & Offers</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Check the <b>Discounts & Offers</b> section in the navigation for current deals.</li>
          <li>Discounts are applied automatically at checkout if available.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-purple-600 mb-2">More Information</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>
            Visit our professional website: <a href="https://yourwebsite.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">https://yourwebsite.com</a>
          </li>
          <li>
            For FAQs and more, see our <a href="https://yourwebsite.com/faq" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">FAQ page</a>.
          </li>
        </ul>
      </section>
    </div>
  </div>
);

export default Help;