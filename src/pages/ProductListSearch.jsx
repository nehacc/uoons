import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpecificCategorieProduct from '../components/SpecificCategorieProduct';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../components/Navbar';
import LowerNavbar from '../components/LowerNavbar'
import Footer from '../components/Footer';
import PriceFilter from '../components/PriceFilter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DiscountFilter from '../components/DiscountFilter';

const ShopPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init();
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/searchAllProducts`, {
          headers: {
            'Accept': '*/*',
            'channel-code': 'ANDROID',
          },
        });
        if (response.data.Data) {
          setData(response.data.Data);
        } else {
          setError('No products found.');
        }
      } catch (err) {
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [viewType, setViewType] = useState('grid');
  const [sortOption, setSortOption] = useState('');
  const [showCount, setShowCount] = useState('50');
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
    console.log('Selected price range:', newRange);
  };

  const handleDiscountChange = (discounts) => {
    setSelectedDiscounts(discounts);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <LowerNavbar />
      <div className="bg-blue-50 flex">
        <aside className="w-64 bg-white p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-6">Filter By</h2>
          <PriceFilter onPriceChange={handlePriceChange} />
          <DiscountFilter onDiscountChange={handleDiscountChange} />
        </aside>

        <div className="py-8 px-4 w-full overflow-hidden">
          <div className="flex flex-col gap-3 items-start md:flex-row md:justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Products</h1>
            <div className="flex items-center">
              <div className="flex items-center ml-4">
                <span className="mr-2">Sort by:</span>
                <select
                  className="border border-gray-300 rounded p-1 outline-0"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </select>
              </div>
              <div className="flex items-center ml-4">
                <span className="mr-2">Show:</span>
                <select
                  className="border border-gray-300 rounded p-1 outline-0"
                  value={showCount}
                  onChange={(e) => setShowCount(e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>
          <SpecificCategorieProduct data={data} sortOrder={sortOption} limit={showCount} priceRange={priceRange} selectedDiscount={selectedDiscounts} />
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default ShopPage;
