import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import DiscountFilter from "../components/DiscountFilter";
import LoadingComponent from "../components/LoadingComponent";
import LowerNavbar from "../components/LowerNavbar";
import Navbar from "../components/Navbar";
import PriceFilter from "../components/PriceFilter";
import RatingFilter from "../components/RatingsFilter";
import React, { useEffect, useState } from "react";
import SpecificCategorieProduct from "../components/SpecificCategorieProduct";
import Test345 from "../pages/Test345";
import axios from "axios";
import { FaList, FaThLarge } from "react-icons/fa";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// import Footer from '../components/Footer';

const ShopPage = () => {
  const {c_id}  = useParams();
 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    AOS.init();
    const fetchData = async ( ) => {
       
        try {
            const response = await axios.get(`/api/getAllProductsByCategories?cat_id=${c_id}`, {
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                    'Accept': '*/*',
                    'channel-code': 'ANDROID',
                },
            });
            setData(response.data.Data.products) ;
             
        } catch (err) {
            setError(`Failed to fetch data. ${error} `);
               
            
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, [c_id]);


  // filters
  const [showBrands, setShowBrands] = useState(true);
  const [showColors, setShowColors] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [viewType, setViewType] = useState('grid');
  const [sortOption, setSortOption] = useState('');
  const [showCount, setShowCount] = useState('50');

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
    console.log('Selected price range:', newRange);
    // You can also trigger filtering logic based on the new price range here
  };

  const [selectedDiscounts, setSelectedDiscounts] = useState([]);

  const handleDiscountChange = (discounts) => {
    setSelectedDiscounts(discounts);
  };

  
  if (loading) {
    return <div className="flex justify-center items-center h-screen"><LoadingComponent/> </div>;
  }

  if (error) {
      return <div className="flex justify-center items-center h-screen">{error}</div>;
  }
  return (
    <>
      <Navbar />
      <LowerNavbar />
      <div className="bg-blue-50 flex ">

        {/* Sidebar */} 
        <aside className="w-64 bg-white p-4 shadow-lg n border border-[#FF5900] ">
          <h2 className="text-xl font-bold mb-6">Filter By</h2>

          {/* Brand Filter */}
          {/* <div className="mb-6">
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
          </div> */}

          {/* Color Filter */}
          {/* <div className="mb-6">
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
          </div> */}

          {/* Price Filter */}
          <PriceFilter onPriceChange={handlePriceChange}   />

          {/* Discount Filter */}
          <DiscountFilter onDiscountChange={handleDiscountChange} />

          {/* Ratings Filter */}
          {/* <RatingFilter  /> */}
        </aside>

        {/* Product Grid */}
        <div className="py-8 px-4 w-full overflow-hidden">
          <div className="flex flex-col gap-3 items-start md:flex-row md:justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Products</h1>
            <div className="flex items-center">
              {/* <FaThLarge
                className={`text-gray-500 mx-2 cursor-pointer ${viewType === 'grid' ? 'text-blue-500' : ''}`}
                onClick={() => setViewType('grid')}
                aria-label="Grid view"
              />
              <FaList
                className={`text-gray-500 mx-2 cursor-pointer ${viewType === 'list' ? 'text-blue-500' : ''}`}
                onClick={() => setViewType('list')}
                aria-label="List view"
              /> */}
              <div className="flex items-center ml-4 ">
                <span className="mr-2">Sort by:</span>
                <select
                  className="border border-gray-300 rounded p-1 outline-0 "
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  {/* <option>Best Sellers</option> */}
                  <option value="">Default</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                  {/* <option>Top Rated</option> */}
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
          <SpecificCategorieProduct data={data} sortOrder={sortOption} limit={showCount} priceRange={priceRange}  selectedDiscount={selectedDiscounts}/>
          {/* <SpecificCategorieProduct data={data}  /> */}
        </div>
      </div>
      <ToastContainer />
      <Test345 />
    </>
  );
};

export default ShopPage;
