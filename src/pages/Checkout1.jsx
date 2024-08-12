import React, { useState } from 'react';
import { FiCreditCard, FiTruck, FiPhone, FiMessageCircle, FiGift, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Header from '../components/Navbar';

const Checkout1 = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('debitCreditCard');
  const product = {
    id: 1,
    brand: "MSI",
    name: "MSI Thin GF63 A12VE-071IN",
    price: 50000,
    images: [
      "https://m.media-amazon.com/images/I/51nifWngl-L._SX679_.jpg"
    ]
  };
  const estimatedDelivery = 150; // Assuming ₹150 for delivery charges

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const getTotalPrice = () => {
    return product.price + estimatedDelivery;
  };

  return (
    <div className='flex flex-col w-full items-center bg-blue-100'>
      <Header />
      <div className="bg-blue-100 w-[95%] my-10 relative">
        <div className="flex justify-between">
          <div className="w-3/4 p-8 bg-white rounded-2xl shadow-xl mr-8">
            <h2 className="text-4xl font-extrabold mb-6">Product Checkout</h2>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-2">Shipping Address</h3>
              <div className="p-4 bg-gray-100 rounded-lg">
                <p>2015 N Broadwell Ave, Grand Island, New Hampshire 68803, United States</p>
                <button className="mt-2 text-blue-600 flex items-center"><FiEdit2 className="mr-1"/>Change</button>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-2">Contact Info</h3>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Email *</label>
                <input type="email" className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none" value="gayave1968@email.com" readOnly />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Mobile Number *</label>
                <input type="tel" className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none" value="+91-7654-987-777" readOnly />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-2">Payment Method</h3>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    id="cashOnDelivery"
                    name="paymentMethod"
                    value="cashOnDelivery"
                    checked={selectedPaymentMethod === 'cashOnDelivery'}
                    onChange={() => handlePaymentMethodChange('cashOnDelivery')}
                    className="form-radio h-4 w-4 text-orange-500"
                  />
                  <span className="ml-2">Cash on Delivery</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    id="debitCreditCard"
                    name="paymentMethod"
                    value="debitCreditCard"
                    checked={selectedPaymentMethod === 'debitCreditCard'}
                    onChange={() => handlePaymentMethodChange('debitCreditCard')}
                    className="form-radio h-4 w-4 text-orange-500"
                  />
                  <span className="ml-2">Debit/Credit Card</span>
                </label>
                {selectedPaymentMethod === 'debitCreditCard' && (
                  <div className="mt-4 space-y-4">
                    <input type="text" className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="Card Number" />
                    <div className="flex space-x-4">
                      <input type="text" className="w-1/2 p-3 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="MM / YYYY" />
                      <input type="text" className="w-1/2 p-3 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="CVV" />
                    </div>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    id="netBanking"
                    name="paymentMethod"
                    value="netBanking"
                    checked={selectedPaymentMethod === 'netBanking'}
                    onChange={() => handlePaymentMethodChange('netBanking')}
                    className="form-radio h-4 w-4 text-orange-500"
                  />
                  <span className="ml-2">Net Banking</span>
                </label>
              </div>
            </div>
          </div>

          <div className="w-1/4 bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-3xl font-bold mb-6">Order Details</h3>
            <div className="flex mb-6">
              <img src={product.images[0]} alt={product.name} className="w-20 h-20 rounded-lg mr-4" />
              <div>
                <h4 className="font-bold text-lg">{product.name}</h4>
                <p className="text-gray-600">{product.brand}</p>
                <p className="text-xl font-bold">₹{product.price}</p>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{product.price}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Estimated Delivery & Handling</span>
                <span>₹{estimatedDelivery}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{getTotalPrice()}</span>
              </div>
            </div>
            <button className='w-full flex justify-center items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-md shadow-md text-lg transition duration-300'>
              <FiCreditCard className='mr-2' /> Make Payment
            </button>
          </div>
        </div>

        <div className="flex justify-around mt-16">
          <div className="flex flex-col items-center">
            <FiTruck size={24} className="mb-2" />
            <span className="font-semibold">Free Shipping</span>
            <span className="text-sm">When you spend ₹50,000+</span>
          </div>
          <div className="flex flex-col items-center">
            <FiPhone size={24} className="mb-2" />
            <span className="font-semibold">Call Us Anytime</span>
            <span className="text-sm">+34 555 5555</span>
          </div>
          <div className="flex flex-col items-center">
            <FiMessageCircle size={24} className="mb-2" />
            <span className="font-semibold">Chat With Us</span>
            <span className="text-sm">We offer 24-hour chat support</span>
          </div>
          <div className="flex flex-col items-center">
            <FiGift size={24} className="mb-2" />
            <span className="font-semibold">Gift Cards</span>
            <span className="text-sm">For your loved one, in any amount</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout1;
