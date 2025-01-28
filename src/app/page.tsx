"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';
import Header from './components/Header';


type Calculator = {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
  category: string;
};

const calculators: Calculator[] = [
  { id: 1, title: 'Snow Day Calculator', description: 'Predict snow day likelihood', icon: '❄️', color: 'from-blue-500 to-blue-600', link: '/snow-day-calculator', category: 'Everyday Use' },
  { id: 2, title: 'Bottleneck Calculator', description: 'Find performance bottlenecks', icon: '💻', color: 'from-red-500 to-red-600', link: '/bottleneck-calculator', category: 'Engineering' },
  { id: 3, title: 'RREF Calculator', description: 'Reduced Row Echelon Form', icon: '🎓', color: 'from-green-500 to-green-600', link: '/rref-calculator', category: 'Mathematics' },
  { id: 4, title: 'Cross Product Calculator', description: 'Calculate vector cross product', icon: '📐', color: 'from-yellow-500 to-yellow-600', link: '/cross-product-calculator', category: 'Mathematics' },
  { id: 5, title: 'ACFT Calculator', description: 'Army Combat Fitness Test', icon: '💪', color: 'from-pink-500 to-pink-600', link: '/acft-calculator', category: 'Health' },
  { id: 6, title: 'TI-84 Calculator Online', description: 'Simulate TI-84', icon: '🖩', color: 'from-indigo-500 to-indigo-600', link: '/ti-84-calculator', category: 'Mathematics' },
  { id: 7, title: 'A1C Calculator', description: 'Estimate A1C levels', icon: '🩸', color: 'from-teal-500 to-teal-600', link: '/a1c-calculator', category: 'Health' },
  { id: 8, title: 'Midpoint Calculator', description: 'Find the midpoint between points', icon: '📏', color: 'from-orange-500 to-orange-600', link: '/midpoint-calculator', category: 'Mathematics' },
  { id: 9, title: 'Taylor Series Calculator', description: 'Calculate Taylor Series', icon: '📈', color: 'from-cyan-500 to-cyan-600', link: '/taylor-series-calculator', category: 'Mathematics' },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayCount, setDisplayCount] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category');
    setSelectedCategory(category);
    setSearchTerm('');
  }, [searchParams]);

  const filteredCalculators = calculators.filter(calc => 
    (selectedCategory ? calc.category.toLowerCase() === selectedCategory.toLowerCase() : true) &&
    (calc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     calc.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const displayedCalculators = searchTerm || selectedCategory ? filteredCalculators : calculators.slice(0, displayCount);

  const loadMore = () => {
    setDisplayCount(prevCount => Math.min(prevCount + 6, calculators.length));
  };

  return (
    <>
      <Head>
        <title>House of Calculators - Calculate Anything</title>
        <meta name="description" content="A comprehensive collection of useful online calculators for everyday tasks and specialized needs. Find and use a wide range of calculators in one convenient location." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="relative overflow-hidden mb-16">
            <div className="absolute inset-0 z-0">
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
              <h2 className="text-5xl font-extrabold mb-4 text-white">Calculate Anything</h2>
              <p className="text-xl text-gray-300 mb-8">Explore our vast collection of online calculators</p>
              <div className="relative max-w-md mx-auto mb-4">
                <input
                  type="text"
                  placeholder="Search calculators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 py-2 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-md border border-gray-700 rounded-md text-white placeholder-gray-400"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {selectedCategory && (
              <h2 className="text-3xl font-bold mb-8 text-center">{selectedCategory} Calculators</h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedCalculators.map(calc => (
                <div key={calc.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <div className={`h-2 bg-gradient-to-r ${calc.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-2xl">{calc.icon}</span>
                      <h3 className="text-white text-xl font-semibold">{calc.title}</h3>
                    </div>
                    <p className="text-gray-400 mb-4">{calc.description}</p>
                    <Link
                      href={calc.link}
                      className="block w-full text-center bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors duration-300"
                    >
                      Open Calculator
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {!searchTerm && !selectedCategory && displayCount < calculators.length && (
              <div className="mt-8 text-center">
                <button
                  onClick={loadMore}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </main>
        <footer className="bg-gray-800 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400">
            <p>&copy; 2024 Houseofcalculators.com. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
