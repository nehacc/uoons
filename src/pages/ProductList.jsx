import React from 'react';
import { FaStar, FaThLarge, FaList } from 'react-icons/fa';
import { MdArrowDropDown } from 'react-icons/md';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const products = [
  {
    id: 1,
    img: "//m.media-amazon.com/images/I/314Rp+8XKWL._AC_SR300,300.jpg",
    title: "Gaming Laptop",
    rating: 4.8,
    reviews: 120,
    price: "₹1500",
    offerPrice: "₹1200",
    discountPercentage: "20% off",
  },
  {
    id: 2,
    img: "//m.media-amazon.com/images/I/314Rp+8XKWL._AC_SR300,300.jpg",
    title: "Smartphone",
    rating: 4.6,
    reviews: 200,
    price: "₹800",
    offerPrice: "₹650",
    discountPercentage: "18.75% off",
  },
  {
    id: 3,
    img: "//m.media-amazon.com/images/I/314Rp+8XKWL._AC_SR300,300.jpg",
    title: "Wireless Headphones",
    rating: 4.7,
    reviews: 150,
    price: "₹200",
    offerPrice: "₹150",
    discountPercentage: "25% off",
  },
  {
    id: 4,
    img: "//m.media-amazon.com/images/I/314Rp+8XKWL._AC_SR300,300.jpg",
    title: "Smartwatch",
    rating: 4.5,
    reviews: 180,
    price: "₹250",
    offerPrice: "₹200",
    discountPercentage: "20% off",
  },
  {
    id: 5,
    img: "//m.media-amazon.com/images/I/314Rp+8XKWL._AC_SR300,300.jpg",
    title: "Digital Camera",
    rating: 4.4,
    reviews: 100,
    price: "₹500",
    offerPrice: "₹400",
    discountPercentage: "20% off",
  },
];

const ShopPage = () => {
  return (
    <>
      <Navbar />
      <div className="bg-blue-50 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Filter By</h2>
          <div className="mb-6">
            <h3 className="font-semibold mb-2 flex items-center">
              Category <MdArrowDropDown />
            </h3>
            <ul>
              <li className="mb-2">
                <input type="checkbox" id="laptops" />
                <label htmlFor="laptops" className="ml-2">Laptops</label>
              </li>
              <li className="mb-2">
                <input type="checkbox" id="smartphones" />
                <label htmlFor="smartphones" className="ml-2">Smartphones</label>
              </li>
              <li className="mb-2">
                <input type="checkbox" id="cameras" />
                <label htmlFor="cameras" className="ml-2">Cameras</label>
              </li>
              <li className="mb-2">
                <input type="checkbox" id="headphones" />
                <label htmlFor="headphones" className="ml-2">Headphones</label>
              </li>
              <li className="mb-2">
                <input type="checkbox" id="smartwatches" />
                <label htmlFor="smartwatches" className="ml-2">Smartwatches</label>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2 flex items-center">
              Brand <MdArrowDropDown />
            </h3>
            <ul>
              <li className="mb-2">
                <input type="checkbox" id="pantum" />
                <label htmlFor="pantum" className="ml-2">Pantum</label>
              </li>
              <li className="mb-2">
                <input type="checkbox" id="hp" />
                <label htmlFor="hp" className="ml-2">HP</label>
              </li>
              <li className="mb-2">
                <input type="checkbox" id="epson" />
                <label htmlFor="epson" className="ml-2">Epson</label>
              </li>
              <li className="mb-2">
                <input type="checkbox" id="ricoh" />
                <label htmlFor="ricoh" className="ml-2">Ricoh</label>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2 flex items-center">
              Color <MdArrowDropDown />
            </h3>
            <ul>
              <li className="mb-2">
                <input type="checkbox" id="black" />
                <label htmlFor="black" className="ml-2">Black</label>
              </li>
              <li className="mb-2">
                <input type="checkbox" id="white" />
                <label htmlFor="white" className="ml-2">White</label>
              </li>
              <li className="mb-2">
                <input type="checkbox" id="red" />
                <label htmlFor="red" className="ml-2">Red</label>
              </li>
              <li className="mb-2">
                <input type="checkbox" id="blue" />
                <label htmlFor="blue" className="ml-2">Blue</label>
              </li>
              <li className="mb-2">
                <input type="checkbox" id="green" />
                <label htmlFor="green" className="ml-2">Green</label>
              </li>
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 p-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Products</h1>
            <div className="flex items-center">
              <FaThLarge className="text-gray-500 mx-2 cursor-pointer" />
              <FaList className="text-gray-500 mx-2 cursor-pointer" />
              <div className="flex items-center ml-4">
                <span className="mr-2">Sort by:</span>
                <select className="border border-gray-300 rounded p-1">
                  <option>Best Sellers</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Top Rated</option>
                </select>
              </div>
              <div className="flex items-center ml-4">
                <span className="mr-2">Show:</span>
                <select className="border border-gray-300 rounded p-1">
                  <option>12</option>
                  <option>24</option>
                  <option>36</option>
                  <option>48</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-x-0">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow p-4 relative hover:shadow-xl transition-shadow duration-300 w-[200px]"
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="h-[120px] w-full object-cover rounded-md"
                />
                <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
                <div className="flex items-center mt-1 text-yellow-500">
                  <FaStar />
                  <span className="ml-1">{product.rating}</span>
                  <span className="text-gray-500 ml-2">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-xl font-bold text-primary">{product.offerPrice}</span>
                  <span className="line-through ml-2 text-gray-500">{product.price}</span>
                </div>
                <div className="text-green-500">{product.discountPercentage}</div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopPage;
