import React, { useState, useEffect } from 'react';
import { FiCreditCard } from 'react-icons/fi';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import UserSession from '../user';

const Checkout = () => {
  const { p_id } = useParams();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('debitCreditCard');
  const [product, setProduct] = useState(null); // State to store product data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [address, setAddress] = useState(null); // State to store address data

  useEffect(() => {
    // Fetch product data from API
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/api/productDetail?pid=${p_id}`, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            'Accept': '*/*',
            'channel-code': 'ANDROID',
            'auth': UserSession.getAuth(),
          },
        });
        setProduct(response.data.Data); // Assuming the product data is in response.data.Data
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    // Fetch address data from API
    const fetchAddressData = async () => {
      try {
        const response = await axios.get('/api/getUserAddress', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'channel-code': 'ANDROID',
            'auth': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijc0MCIsInByb2ZpbGVpZCI6IjE5NzUyNzAwMzgiLCJuYW1lIjoiQWJoaXNoZWsgU2hhcm1hIiwiZW1haWwiOiJzaXRlbnR3ZWJAZ21haWwuY29tIiwibW9iaWxlX25vIjoiOTY5MTQwNzQ1NSIsImZ0b2tlbiI6ImFkZmxqamZhc2xkZmprYSIsIm90cCI6NjA1Mn0.e36R2OF9THNrMBB0b4VlDa-1G1Z0TuMGLEGhbbfRKSU",
          },
        });
        setAddress(response.data.Data[0]); // Assuming the address data is in response.data.Data[0]
      } catch (error) {
        console.error('Error fetching address data:', error);
      }
    };

    fetchProductData();
    fetchAddressData();
  }, []);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const getTotalPrice = () => {
    return product ? parseFloat(product.product_sale_price) + parseFloat(product.shipping_charges || 0) : 0;
  };

  if (isLoading || !address) {
    return <div>Loading...</div>; // Display loading state
  }

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
                <p>{`${address.saddress1}, ${address.saddress2}, ${address.scity}, ${address.sstate}, ${address.scountry} - ${address.spincode}`}</p>
                <button className="mt-2 text-blue-600">Change</button>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold">Contact Info</h3>
                <div className="mb-2">
                  <label className="block font-bold">Email *</label>
                  <input type="email" className="w-full p-2 border rounded-md" value={address.semail} readOnly />
                </div>
                <div className="mb-2">
                  <label className="block font-bold">Mobile Number *</label>
                  <input type="tel" className="w-full p-2 border rounded-md" value={address.smobile_no} readOnly />
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
                <img
                  src={"https://uoons.com/" + product.product_images}
                  alt={product.product_name}
                  className="w-[100px] h-[100px] object-scale-down rounded-lg"
                />
                <div>
                  <h4 className="font-bold text-lg">{product.product_name}</h4>
                  <p className="text-gray-600">{product.brand}</p>
                  <p className="text-lg font-bold">₹{product.product_sale_price}</p>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold">Summary</h3>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{product.product_sale_price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Estimated Delivery & Handling</span>
                  <span>₹{product.shipping_charges || 0}</span>
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
