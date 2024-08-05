import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTruck, FiPhone, FiMessageCircle, FiGift } from 'react-icons/fi';
import { FaCreditCard } from 'react-icons/fa';
import Header from '../components/Navbar';
import Footer from '../components/Footer';
import { FaStar, FaStarHalfAlt, FaRegStar, FaTag, } from 'react-icons/fa';


const AddToCart = () => {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    axios.get('/api/getMyCart',
      {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
          'Accept': '*/*',
          'channel-code': 'ANDROID',
          'auth': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijc0MCIsInByb2ZpbGVpZCI6IjE5NzUyNzAwMzgiLCJuYW1lIjoiQWJoaXNoZWsgU2hhcm1hIiwiZW1haWwiOiJzaXRlbnR3ZWJAZ21haWwuY29tIiwibW9iaWxlX25vIjoiOTY5MTQwNzQ1NSIsImZ0b2tlbiI6ImFkZmxqamZhc2xkZmprYSIsIm90cCI6NjA1Mn0.e36R2OF9THNrMBB0b4VlDa-1G1Z0TuMGLEGhbbfRKSU"
        }
      }
    ) // Adjust this URL to your actual API endpoint
      .then(response => {
        const cartItems = response.data.Data.items.map(item => ({
          id: item.id,
          userId: item.user_id,
          pid: item.pid,
          quantity: parseInt(item.qty),
          name: item.product_name,
          price: parseFloat(item.product_sale_price),
          originalPrice: parseFloat(item.product_price),
          images: [`https://uoons.com/${item.product_images}`], // Adjust the path to your actual image path
          stock: item.product_stock,
          isInStock: item.isInStock,
          isCashOnDelivery: item.isCashOnDelivery,
          discount: item.discount,
          totalSalePrice: item.total_sale_price,
          totalOrderAmount: item.total_order_amount,
        }));
        setCart(cartItems);
      })
      .catch(error => console.error('Error fetching cart data:', error));
  }, []);

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
                    <p className="text-gray-600">Stock: {product.stock}</p>
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

          <div className="mt-1 flex items-center gap-2">
            <FaTag className="text-green-600" />
            <input
              type="text"
              placeholder="Apply coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="border border-gray-300 rounded-l-lg py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
            />
            <button onClick={applyCoupon} className="bg-green-600 text-white font-semibold py-2 px-4 rounded-r-lg transition duration-300 ease-in-out transform hover:scale-105">Apply</button>
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
