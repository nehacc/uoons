import React from 'react';
import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t-2 border-gray-700">
      <div className="container mx-auto text-center">
        {/* Logo */}
        <div className="mb-6">
          <img src="../../Uoons_Ads_logo.png" alt="Uoons-Ads Logo" className="w-56 mx-auto my-4" />
        </div>

        {/* Tagline */}
        <p className="text-gray-400 mb-8 text-lg">
          Connecting Sellers to Customers
        </p>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <a href="https://facebook.com" className="text-gray-400 hover:text-white transition duration-300">
            <Icon icon="mdi:facebook" className="w-8 h-8" />
          </a>
          <a href="https://twitter.com" className="text-gray-400 hover:text-white transition duration-300">
            <Icon icon="mdi:twitter" className="w-8 h-8" />
          </a>
          <a href="https://plus.google.com" className="text-gray-400 hover:text-white transition duration-300">
            <Icon icon="mdi:google" className="w-8 h-8" />
          </a>
          <a href="https://youtube.com" className="text-gray-400 hover:text-white transition duration-300">
            <Icon icon="mdi:youtube" className="w-8 h-8" />
          </a>
          <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition duration-300">
            <Icon icon="mdi:linkedin" className="w-8 h-8" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 mb-8">
          Copyright ©2021 <a href="https://foolishdeveloper.com" className="text-orange-600 hover:text-orange-400 transition duration-300">UoonsAds</a>
        </p>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-10 text-lg">
          <a href="/" className="text-gray-400 hover:text-white transition duration-300">Home</a>
          <a href="/about" className="text-gray-400 hover:text-white transition duration-300">About</a>
          <a href="/contact" className="text-gray-400 hover:text-white transition duration-300">Contact</a>
          <a href="/blog" className="text-gray-400 hover:text-white transition duration-300">Blog</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
