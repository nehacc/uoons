import React, { useState } from 'react';
import { FaThLarge, FaList, FaStar } from 'react-icons/fa';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SpecificCategorieProduct from '../components/SpecificCategorieProduct';
import { useParams } from 'react-router-dom';
import PriceFilter from '../components/PriceFilter';
import RatingFilter from '../components/RatingsFilter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShopPage = () => {
  const { c_id } = useParams();

  const [showBrands, setShowBrands] = useState(true);
  const [showColors, setShowColors] = useState(true);
  const [viewType, setViewType] = useState('grid');
  const [sortOption, setSortOption] = useState('Best Sellers');
  const [showCount, setShowCount] = useState('12');

  

  return (
    <>
      <Navbar />
      <div className="bg-blue-50 flex">

        {/* Sidebar */}
        <aside className="w-64 bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-6">Filter By</h2>

          {/* Brand Filter */}
          <div className="mb-6">
            <h3
              className="font-semibold mb-2 flex items-center cursor-pointer"
              onClick={() => setShowBrands(!showBrands)}
            >
              Brand {showBrands ? <MdArrowDropUp /> : <MdArrowDropDown />}
            </h3>
            {showBrands && (
              <ul>
                {['Pantum', 'HP', 'Epson', 'Ricoh'].map((brand) => (
                  <li className="mb-2" key={brand}>
                    <input type="checkbox" id={brand.toLowerCase()} />
                    <label htmlFor={brand.toLowerCase()} className="ml-2">{brand}</label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Color Filter */}
          <div className="mb-6">
            <h3
              className="font-semibold mb-2 flex items-center cursor-pointer"
              onClick={() => setShowColors(!showColors)}
            >
              Color {showColors ? <MdArrowDropUp /> : <MdArrowDropDown />}
            </h3>
            {showColors && (
              <ul>
                {['Black', 'White', 'Red', 'Blue', 'Green'].map((color) => (
                  <li className="mb-2" key={color}>
                    <input type="checkbox" id={color.toLowerCase()} />
                    <label htmlFor={color.toLowerCase()} className="ml-2">{color}</label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Price Filter */}
          <PriceFilter />

          {/* Ratings Filter */}
          <RatingFilter  />
        </aside>

        {/* Product Grid */}
        <div className=" p-8 w-full overflow-hidden">
          <div className=" md:flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Products</h1>
            <div className="flex items-center">
              <FaThLarge
                className={`text-gray-500 mx-2 cursor-pointer ${viewType === 'grid' ? 'text-blue-500' : ''}`}
                onClick={() => setViewType('grid')}
                aria-label="Grid view"
              />
              <FaList
                className={`text-gray-500 mx-2 cursor-pointer ${viewType === 'list' ? 'text-blue-500' : ''}`}
                onClick={() => setViewType('list')}
                aria-label="List view"
              />
              <div className="flex items-center ml-4">
                <span className="mr-2">Sort by:</span>
                <select
                  className="border border-gray-300 rounded p-1"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option>Best Sellers</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Top Rated</option>
                </select>
              </div>
              <div className="flex items-center ml-4">
                <span className="mr-2">Show:</span>
                <select
                  className="border border-gray-300 rounded p-1"
                  value={showCount}
                  onChange={(e) => setShowCount(e.target.value)}
                >
                  <option>12</option>
                  <option>24</option>
                  <option>36</option>
                  <option>48</option>
                </select>
              </div>
            </div>
          </div>
          <SpecificCategorieProduct c_id={c_id} />
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default ShopPage;
