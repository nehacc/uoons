import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import DiscountFilter from "../components/DiscountFilter";
import LowerNavbar from "../components/LowerNavbar";
import Navbar from "../components/Navbar";
import PriceFilter from "../components/PriceFilter";
import React, { useEffect, useState } from "react";
import SpecificCategorieProduct2 from "../components/SpecificCategorieProduct2";
import Test345 from "../pages/Test345";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// import Footer from '../components/Footer';

const ShopPage = () => {
  const { priceId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortOption, setSortOption] = useState('');
  const [showCount, setShowCount] = useState('50');
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);

  useEffect(() => {
    AOS.init();
    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/getProductByPrice?priceId=${priceId}`, {
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                    'Accept': '*/*',
                    'channel-code': 'ANDROID',
                },
            });
            setData(response.data.data);
        } catch (err) {
            setError('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, [priceId]);

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
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
        {/* Sidebar */}
        <aside className="w-64 bg-white p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-6">Filter By</h2>
          <PriceFilter onPriceChange={handlePriceChange} />
          <DiscountFilter onDiscountChange={handleDiscountChange} />
        </aside>

        {/* Product Grid */}
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
          <SpecificCategorieProduct2
            data={data}
            sortOrder={sortOption}
            limit={showCount}
            priceRange={priceRange}
            selectedDiscount={selectedDiscounts}
          />
        </div>
      </div>
      <ToastContainer />
      <Test345 />
    </>
  );
};

export default ShopPage;
