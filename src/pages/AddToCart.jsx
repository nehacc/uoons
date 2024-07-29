import React, { useState } from 'react';
import { FiTruck, FiPhone, FiMessageCircle, FiGift } from 'react-icons/fi';
import { FaCreditCard } from 'react-icons/fa';
import Header from '../components/Navbar';
import Footer from '../components/Footer';

const productsData = [
  {
    id: 1,
    brand: "MSI",
    name: "MSI Thin GF63 A12VE-071IN",
    rating: 4.0,
    reviews: 400,
    price: 50000,
    originalPrice: 100000,
    discount: 50,
    emi: "₹1209.91/- per month",
    images: [
      "https://m.media-amazon.com/images/I/51nifWngl-L._SX679_.jpg",
      "https://m.media-amazon.com/images/I/41ZTSKvhmZL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/317pB2MO57L._SX679_.jpg",
      "https://m.media-amazon.com/images/I/81TurWp5IdL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71Wy96L0h1L._SX679_.jpg"
    ],
    description: "MSI GF63 Thin is a lightweight and powerful gaming laptop with Intel Core i5-12450H, 16GB DDR4 memory, and NVIDIA GeForce GTX 1650 Max-Q graphics.",
    specifications: {
      "Sales Package": "Laptop, Power Adaptor, User Guide, Warranty Documents",
      // Other specifications...
    },
    highlights: [
      "Lightweight and portable design",
      "High-performance components for gaming and multitasking",
      "Vivid Full HD display",
      "Efficient cooling system"
    ],
    salientFeatures: [
      "Powerful Intel Core i5 processor for seamless performance",
      // Other salient features...
    ],
    shippingInfo: {
      shipsFrom: "Uoons",
      soldBy: "GADGETRON"
    }
  },
  {
    id: 2,
    brand: "HP",
    name: "HP Victus Gaming Laptop fa1307TX",
    rating: 4.4,
    reviews: 120,
    price: 75000,
    originalPrice: 85000,
    discount: 12,
    emi: "₹1812.75/- per month",
    images: [
      "https://m.media-amazon.com/images/I/41lGKvvMOeL._SX300_SY300_QL70_FMwebp_.jpg",
      "https://m.media-amazon.com/images/I/91pBcRC8XzL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/81+vAxk5koL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/81RSPt+6OHL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71lgKyVXG+L._SX679_.jpg"
    ],
    description: "HP Victus Gaming Laptop with 13th Gen Intel Core i5-13420H, 16GB DDR4 memory, and NVIDIA GeForce RTX 2050 graphics.",
    specifications: {
      "Sales Package": "Laptop, Power Adaptor, User Guide, Warranty Documents",
      // Other specifications...
    },
    highlights: [
      "Advanced cooling system for sustained performance",
      "Stunning visuals with NVIDIA GeForce RTX 2050",
      "Ample storage with 1TB NVMe SSD",
      "Immersive audio by Bang & Olufsen",
      "Durable and stylish design"
    ],
    salientFeatures: [
      "13th Gen Intel Core i5 processor for high-speed computing",
      // Other salient features...
    ],
    shippingInfo: {
      shipsFrom: "HP Store",
      soldBy: "HP Official Store"
    }
  }
];

const AddToCart = () => {
  const [cart, setCart] = useState(productsData.map(product => ({ ...product, quantity: 1 })));
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const incrementQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
  };

  const decrementQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    }
    setCart(newCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const applyCoupon = () => {
    if (coupon === 'SAVE10') {
      setDiscount(0.1); // 10% discount
    } else {
      setDiscount(0);
    }
  };

  const discountedTotal = getTotalPrice() * (1 - discount);

  return (
    <>
      <Header />
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 bg-blue-100'>
      <div className="col-span-8 bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-4">Shopping Bag</h2>
        <p className="text-lg mb-6">{cart.length} items in your bag.</p>
        <div className="border-b pb-4 mb-4">
          {cart.map((product, index) => (
            <div key={product.id} className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-4 flex items-center">
                <img src={product.images[0]} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="ml-4">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-gray-600">{product.brand}</p>
                  <p className="text-gray-600">Color: {product.specifications.Color}</p>
                  <p className="text-gray-600">Size: {product.specifications.ScreenSize}</p>
                </div>
              </div>
              <div className="col-span-8 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-lg mr-8">₹{product.price}</span>
                  <div className="flex items-center border px-2 rounded-lg">
                    <button onClick={() => decrementQuantity(index)} className="px-2 text-gray-600 hover:text-gray-800">-</button>
                    <span className="px-4">{product.quantity}</span>
                    <button onClick={() => incrementQuantity(index)} className="px-2 text-gray-600 hover:text-gray-800">+</button>
                  </div>
                  <span className="text-lg ml-8">₹{product.price * product.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Apply Coupon</h3>
          <div className="flex items-center border p-2 rounded-lg">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="w-full px-2 py-1 rounded-lg border-none"
            />
            <button onClick={applyCoupon} className="ml-2 px-4 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600">Apply</button>
          </div>
        </div>
      </div>
      <div className="col-span-8 lg:col-span-4 bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4">Cart Summary</h3>
        <div className="bg-yellow-100 p-4 rounded-lg mb-4">
          <div className="flex justify-between mb-2">
            <span>Cart Subtotal</span>
            <span>₹{getTotalPrice()}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between mb-2">
              <span>Discount</span>
              <span>-₹{getTotalPrice() * discount}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg">
            <span>Cart Total</span>
            <span>₹{discountedTotal.toFixed(2)}</span>
          </div>
        </div>
        <button className='flex mx-auto items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-md shadow-md text-lg'>
          <FaCreditCard className='mr-2' /> Buy Now
        </button>
      </div>
      
    </div>
    <Footer/>
    </>
  );
};

export default AddToCart;
