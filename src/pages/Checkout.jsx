import React, { useState } from 'react';
import { FiCreditCard, FiTruck, FiPhone, FiMessageCircle, FiGift } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Checkout = () => {
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
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-blue-100 py-8">
        <div className="w-[95%] relative">
          <div className="flex flex-col gap-3 lg:flex-row w-full p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full lg:w-3/4">
              <h2 className="text-3xl font-bold mb-4">Product Checkout</h2>

              <div className="mb-6">
                <h3 className="text-xl font-bold">Shipping Address</h3>
                <p>2015 N Broadwell Ave, Grand Island, New Hampshire 68803, United States</p>
                <button className="mt-2 text-blue-600">Change</button>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold">Contact Info</h3>
                <div className="mb-2">
                  <label className="block font-bold">Email *</label>
                  <input type="email" className="w-full p-2 border rounded-md" value="gayave1968@email.com" readOnly />
                </div>
                <div className="mb-2">
                  <label className="block font-bold">Mobile Number *</label>
                  <input type="tel" className="w-full p-2 border rounded-md" value="+91-7654-987-777" readOnly />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold">Payment Method</h3>
                <div className="mb-4">
                  <input
                    type="radio"
                    id="cashOnDelivery"
                    name="paymentMethod"
                    value="cashOnDelivery"
                    checked={selectedPaymentMethod === 'cashOnDelivery'}
                    onChange={() => handlePaymentMethodChange('cashOnDelivery')}
                  />
                  <label htmlFor="cashOnDelivery" className="ml-2">Cash on Delivery</label>
                </div>
                <div className="mb-4">
                  <input
                    type="radio"
                    id="debitCreditCard"
                    name="paymentMethod"
                    value="debitCreditCard"
                    checked={selectedPaymentMethod === 'debitCreditCard'}
                    onChange={() => handlePaymentMethodChange('debitCreditCard')}
                  />
                  <label htmlFor="debitCreditCard" className="ml-2">Debit/Credit Card</label>
                  {selectedPaymentMethod === 'debitCreditCard' && (
                    <div className="mt-2">
                      <input type="text" className="w-full p-2 mb-2 border rounded-md" placeholder="Card Number" />
                      <div className="flex justify-between">
                        <input type="text" className="w-1/2 p-2 mr-2 border rounded-md" placeholder="MM / YYYY" />
                        <input type="text" className="w-1/2 p-2 ml-2 border rounded-md" placeholder="CVV" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type="radio"
                    id="netBanking"
                    name="paymentMethod"
                    value="netBanking"
                    checked={selectedPaymentMethod === 'netBanking'}
                    onChange={() => handlePaymentMethodChange('netBanking')}
                  />
                  <label htmlFor="netBanking" className="ml-2">Net Banking</label>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:w-1/4 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Order Details</h3>
              <div className="flex gap-5 items-center mb-4">
                <img src={product.images[0]} alt={product.name} className="w-[100px] h-[100px] object-scale-down rounded-lg" />
                <div>
                  <h4 className="font-bold text-lg">{product.name}</h4>
                  <p className="text-gray-600">{product.brand}</p>
                  <p className="text-lg font-bold">₹{product.price}</p>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold">Summary</h3>
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
              <button className="mt-6 flex mx-auto items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-md shadow-md text-lg">
                <FiCreditCard className="mr-2" /> Make Payment
              </button>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
