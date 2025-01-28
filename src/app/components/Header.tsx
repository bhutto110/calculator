"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 backdrop-filter backdrop-blur-lg bg-opacity-30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image 
            src="/calculator-logo.png"
            alt="House of Calculators Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            House of Calculators
          </h1>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
            <li className="relative group">
              <button className="text-gray-300 hover:text-white transition-colors focus:outline-none">
                Categories ▼
              </button>
              <ul className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-50">
                {allCategories.map((category, index) => (
                  <li key={index}>
                    <Link 
                      href={`/?category=${encodeURIComponent(category)}`}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
            <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
          </ul>
        </nav>
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="text-2xl">☰</span>
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <li><Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">Home</Link></li>
            <li>
              <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
                Categories ▼
              </button>
              <ul className="pl-4">
                {allCategories.map((category, index) => (
                  <li key={index}>
                    <Link 
                      href={`/?category=${encodeURIComponent(category)}`}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li><Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">About</Link></li>
            <li><Link href="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Blog</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}
