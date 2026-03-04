import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import WhyChooseUs from '../components/WhyChooseUs';
import DSCFinder from '../components/DSCFinder';
import { products } from '../data/products';
import { getBuyClickCount } from '../utils/visitCounter';
import { Globe } from 'lucide-react';

export default function Home() {
  const [buyCount, setBuyCount] = useState(1285);

  useEffect(() => {
    setBuyCount(getBuyClickCount());
  }, []);

  const handleBuyClick = (newCount: number) => {
    setBuyCount(newCount);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🤖 AI-Powered DSC Solutions – Buy Digital Signature Certificate Online
        </h1>
        <p className="text-xl text-blue-600 font-semibold mb-4">
          Lowest Price Guaranteed • AI-Powered Recommendations • Lightning Fast Delivery
        </p>
        <div className="text-gray-600 max-w-3xl mx-auto space-y-4">
          <div className="grid md:grid-cols-3 gap-4 text-left">
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border border-blue-100">
              <h2 className="font-bold text-blue-600 flex items-center gap-2">
                🤖 AI-Powered Matching
              </h2>
              <p className="text-sm">Smart DSC recommendations based on your needs</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-lg border border-green-100">
              <h2 className="font-bold text-green-600 flex items-center gap-2">
                📦 Complete Package
              </h2>
              <p className="text-sm">DSC + USB Pendrive Included</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-lg border border-purple-100">
              <h2 className="font-bold text-purple-600 flex items-center gap-2">
                🚀 Lightning Fast
              </h2>
              <p className="text-sm">Pan India Courier Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Banner */}
      <div className="mb-8 text-center">
        <a
          href="https://g.page/r/Cd1IFJTvW_XIEB0/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl"
        >
          <Globe className="w-6 h-6" />
          <span className="text-xl font-bold">⭐ View Our 5-Star Customer Reviews & Ratings</span>
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
            {buyCount.toLocaleString()}+ Happy Customers
          </span>
        </a>
      </div>

      {/* AI-Powered DSC Finder */}
      <DSCFinder />

      <section id="products" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-12">
        {products.map((product, index) => (
          <ProductCard 
            key={index} 
            {...product} 
            showBulkDiscount={true}
            onBuyClick={handleBuyClick}
          />
        ))}
      </section>

      <WhyChooseUs />
    </main>
  );
}