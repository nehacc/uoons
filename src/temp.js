import React, { useState, useEffect } from 'react';
import { FiCreditCard } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt, FaRegStar, FaTag, } from 'react-icons/fa';

import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import UserSession from '../user';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import InsertUserAddress from '../components/InsertNewAddress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Checkout = () => {
  const { p_id } = useParams();
  const productIds = p_id.split(',');

  const [activeStep, setActiveStep] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Online');
  const [productsData, setProductsData] = useState([]);
  const [isProductDataLoading, setIsProductDataLoading] = useState(true);
  const [isAddressLoading, setIsAddressLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  const [showAddressForm, setShowAddressForm] = useState(false);


  const [coupon, setCoupon] = useState(''); // State for coupon
  const [discount, setDiscount] = useState(0); // State for discount


  const steps = ['Select Address', 'Review Contact Info', 'Choose Payment Method'];

  useEffect(() => {
    fetchProductData();
    fetchAddressData();
    loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

    const fetchProductData = async () => {
      try {
        const responses = await Promise.all(
          productIds.map((id) =>
            axios.get(`/api/productDetail?pid=${id}`, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Accept: '*/*',
                'channel-code': 'ANDROID',
                auth: UserSession.getAuth(),
              },
            })
          )
        );
        const data = responses.map(response => response.data.Data);
        setProductsData(data);
        setIsProductDataLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setIsProductDataLoading(false);
      }
    };

    const fetchAddressData = async () => {
      try {
        const response = await axios.get('/api/getUserAddress', {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            'channel-code': 'ANDROID',
            auth: UserSession.getAuth(),
          },
        });
        setAddresses(response.data.Data);
        setIsAddressLoading(false);
      } catch (error) {
        console.error('Error fetching address data:', error);
        setIsAddressLoading(false);
      }
    };

    const loadRazorpayScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handlePaymentMethodChange = (method) => setSelectedPaymentMethod(method);
  const handleAddressSelection = (index) => setSelectedAddressIndex(index);

  const handleAddressFormSubmit = () => {
    setShowAddressForm(false);
    fetchAddressData(); // Refresh the address list
  };

  const handleApplyCoupon = async () => {
    try {
      const response = await axios.post(
        '/api/checkCoupon',
        {
          coupon, // This is the coupon value you want to validate
        },
        {
          headers: {
            'channel-code': 'ANDROID',
            'Authorization': UserSession.getAuth(), // Assuming UserSession.getAuth() returns the token
          },
        }
      );
  
      // Check response and apply discount accordingly
      if (response.data.valid) {
        setDiscount(response.data.discountAmount); // Apply the discount from the response
        toast.success(`Coupon Applied! ₹${response.data.discountAmount} discount applied.`);
      } else {
        toast.error('Invalid Coupon Code');
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      toast.error('There was an error applying the coupon. Please try again later.');
    }
  };

  const getTotalPrice = () => {
    if (productsData.length === 0) return 0;
    const total = productsData.reduce((total, product) => {
      const productPrice = parseFloat(product.product_sale_price);
      const shippingCharges = parseFloat(product.shipping_charges || 0);
      return total + productPrice + shippingCharges;
    }, 0);
    return total - discount; // Apply discount
  };

  const handlePayment = async () => {
    const options = {
      key: 'rzp_test_RIrpiyDJHDsnpS',
      amount: getTotalPrice() * 100,
      currency: 'INR',
      name: 'UOONS',
      description: 'Product Purchase Test',
      image: 'https://uoons.com/assets/front/img/logo.png',
      handler: function (response) {
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
        alert('Payment Successful');
        // navigate buddy!!! to the thankyou page
        navigate('/thankyou')
      },
      prefill: {
        name: addresses[selectedAddressIndex].bname,
        email: addresses[selectedAddressIndex].bemail,
        contact: addresses[selectedAddressIndex].bmobile_no,
      },
      notes: {
        address: `${addresses[selectedAddressIndex].baddress1}, ${addresses[selectedAddressIndex].baddress2}, ${addresses[selectedAddressIndex].bcity}, ${addresses[selectedAddressIndex].bstate}, ${addresses[selectedAddressIndex].bcountry} - ${addresses[selectedAddressIndex].bpincode}`,
      },
      theme: {
        color: "white",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on('payment.failed', (response) => {
      console.error(response.error);
      alert('Payment Failed. Please try again.');
    });
  };

  const handleSubmitOrder = () => {
    if (selectedPaymentMethod === 'Online') {
      handlePayment();
    } else {
      console.log('Placing COD order...');
      // Add functionality to handle COD order placement
    }
  };

  if (isProductDataLoading || isAddressLoading) {
    return <div>Loading...</div>;
  }

  const selectedAddress = addresses[selectedAddressIndex];

  return (
    <>
     <ToastContainer />
      <Navbar />
      <div className="flex flex-col items-center bg-blue-100 py-8">
        <div className="w-[95%] relative">
          <div className="flex flex-col gap-3 lg:flex-row w-full p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <div className="flex flex-col w-full space-y-6">
              <div className="mb-4">
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label, index) => (
                    <Step key={index}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
              {activeStep === 0 && (
                <div className="bg-white p-4 rounded-lg shadow-md">
                  {showAddressForm ? (
                    <InsertUserAddress onSuccess={handleAddressFormSubmit}/>
                    ) : (
                    <>
                        <h3 className="text-lg font-semibold mb-2">Select Delivery Address</h3>
                        <div className="flex flex-col gap-4">
                        {addresses.map((address, index) => (
                            <div
                            key={index}
                            className={`p-4 border rounded-md cursor-pointer ${selectedAddressIndex === index ? 'border-blue-500' : 'border-gray-300'}`}
                            onClick={() => handleAddressSelection(index)}
                            >
                            <h4 className="text-lg font-semibold">{address.bname}</h4>
                            <p>{`${address.baddress1}, ${address.baddress2}`}</p>
                            <p>{`${address.bcity}, ${address.bstate}`}</p>
                            <p>{`${address.bcountry} - ${address.bpincode}`}</p>
                            </div>
                        ))}
                        <Button variant='outlined' onClick={() => setShowAddressForm(true)}>Enter New Address</Button>
                        <Button variant="contained" onClick={handleNext}>Next</Button>
                        </div>
                    </>
                    )}

                </div>
              )}
              {activeStep === 1 && (
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Review Contact Info</h3>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="font-semibold">Name: </label>
                      <span>{selectedAddress.bname}</span>
                    </div>
                    <div>
                      <label className="font-semibold">Email: </label>
                      <span>{selectedAddress.bemail}</span>
                    </div>
                    <div>
                      <label className="font-semibold">Phone: </label>
                      <span>{selectedAddress.bmobile_no}</span>
                    </div>
                    <Button variant="contained" onClick={handleNext}>
                      Next
                    </Button>
                  </div>
                </div>
              )}
              {activeStep === 2 && (
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Choose Payment Method</h3>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedPaymentMethod === 'Online'}
                          onChange={() => handlePaymentMethodChange('Online')}
                        />
                      }
                      label={
                        <div className="flex items-center space-x-2">
                          <FiCreditCard />
                          <span>Online Payment</span>
                        </div>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedPaymentMethod === 'COD'}
                          onChange={() => handlePaymentMethodChange('COD')}
                        />
                      }
                      label="Cash on Delivery"
                    />
                  </FormGroup>
                  <div className='w-fit flex gap-5 items-center'>
                    <Button variant="contained" color="primary" onClick={handleSubmitOrder}>
                      {selectedPaymentMethod === 'Online' ? 'Make Payment' : 'Place Order'}
                    </Button>
                    <Button variant="outlined" onClick={handleBack}>
                      Back
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="w-full bg-gray-50 p-4 rounded-lg shadow-md">
            <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 mb-4">
              <h3 className="text-2xl font-bold mb-4">Order Details</h3>
              {productsData.map((product, index) => (
                <div key={index} className="flex gap-5 items-center mb-4">
                  <img
                    src={`https://uoons.com/${product.product_images}`}
                    alt={product.product_name}
                    className="w-[100px] h-[100px] object-scale-down rounded-lg"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{product.product_name}</h4>
                    <div className="flex flex-row items-center gap-3 mt-3">
                      <h6 className="text-2xl font-semibold">₹{product.product_sale_price}</h6>
                      <span className="line-through text-gray-500">₹{product.product_price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Products:</span>
                <span>₹{productsData.reduce((total, product) => total + parseFloat(product.product_sale_price), 0)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span>₹{productsData.reduce((total, product) => total + parseFloat(product.shipping_charges || 0), 0)}</span>
              </div>
              {/* Apply coupon */}
              <div className="my-6 flex items-center gap-2">
                  <FaTag className="text-green-600" />
                  <input
                    type="text"
                    placeholder="Apply coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="border border-gray-300 rounded-l-lg py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105 outline-0"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-green-600 text-white font-semibold py-2 px-4 rounded-r-lg transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Apply
                  </button>
                </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>₹{getTotalPrice()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;









import React, { useState, useEffect } from 'react';
import { FiCreditCard } from 'react-icons/fi';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import UserSession from '../user';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

const Checkout = () => {
  const { p_id } = useParams();

  const [activeStep, setActiveStep] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Online');
  const [productData, setProductData] = useState(null);
  const [isProductDataLoading, setIsProductDataLoading] = useState(true);
  const [isAddressLoading, setIsAddressLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  const steps = ['Select Address', 'Review Contact Info', 'Choose Payment Method'];

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/api/productDetail?pid=${p_id}`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
            'channel-code': 'ANDROID',
            auth: UserSession.getAuth(),
          },
        });
        setProductData(response.data.Data);
        setIsProductDataLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setIsProductDataLoading(false);
      }
    };

    const fetchAddressData = async () => {
      try {
        const response = await axios.get('/api/getUserAddress', {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            'channel-code': 'ANDROID',
            auth: UserSession.getAuth(),
          },
        });
        setAddresses(response.data.Data);
        setIsAddressLoading(false);
      } catch (error) {
        console.error('Error fetching address data:', error);
        setIsAddressLoading(false);
      }
    };

    const loadRazorpayScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    fetchProductData();
    fetchAddressData();
    loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
  }, [p_id]);

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handlePaymentMethodChange = (method) => setSelectedPaymentMethod(method);
  const handleAddressSelection = (index) => setSelectedAddressIndex(index);

  const getTotalPrice = () => {
    if (!productData) return 0;
    const productPrice = parseFloat(productData.product_sale_price);
    const shippingCharges = parseFloat(productData.shipping_charges || 0);
    return productPrice + shippingCharges;
  };

  const handlePayment = async () => {
    const options = {
      key: 'rzp_test_RIrpiyDJHDsnpS',
      amount: getTotalPrice() * 100,
      currency: 'INR',
      name: 'UOONS',
      description: 'Product Purchase Test',
      image: 'https://uoons.com/assets/front/img/logo.png',
      handler: function (response) {
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
        alert('Payment Successful');
        // navigate buddy!!!
      },
      prefill: {
        name: addresses[selectedAddressIndex].bname,
        email: addresses[selectedAddressIndex].bemail,
        contact: addresses[selectedAddressIndex].bmobile_no,
      },
      notes: {
        address: `${addresses[selectedAddressIndex].baddress1}, ${addresses[selectedAddressIndex].baddress2}, ${addresses[selectedAddressIndex].bcity}, ${addresses[selectedAddressIndex].bstate}, ${addresses[selectedAddressIndex].bcountry} - ${addresses[selectedAddressIndex].bpincode}`,
      },
      theme: {
        color: "white",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on('payment.failed', (response) => {
      console.error(response.error);
      alert('Payment Failed. Please try again.');
    });
  };

  const handleSubmitOrder = () => {
    if (selectedPaymentMethod === 'Online') {
      handlePayment();
    } else {
      console.log('Placing COD order...');
      // Add functionality to handle COD order placement
    }
  };

  if (isProductDataLoading || isAddressLoading) {
    return <div>Loading...</div>;
  }

  const selectedAddress = addresses[selectedAddressIndex];

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-blue-100 py-8">
        <div className="w-[95%] relative">
          <div className="flex flex-col gap-3 lg:flex-row w-full p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <div className="flex flex-col w-full space-y-6">
              <div className="mb-4">
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label, index) => (
                    <Step key={index}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
              {activeStep === 0 && (
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Select Delivery Address</h3>
                  <div className="flex flex-col gap-4">
                    {addresses.map((address, index) => (
                      <div
                        key={index}
                        className={`p-4 border rounded-md cursor-pointer ${
                          selectedAddressIndex === index ? 'border-blue-500' : 'border-gray-300'
                        }`}
                        onClick={() => handleAddressSelection(index)}
                      >
                        <h4 className="text-lg font-semibold">{address.bname}</h4>
                        <p>{`${address.baddress1}, ${address.baddress2}`}</p>
                        <p>{`${address.bcity}, ${address.bstate}`}</p>
                        <p>{`${address.bcountry} - ${address.bpincode}`}</p>
                      </div>
                    ))}
                    <Button variant="contained" onClick={handleNext}>
                      Next
                    </Button>
                  </div>
                </div>
              )}
              {activeStep === 1 && (
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Review Contact Info</h3>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="font-semibold">Name: </label>
                      <span>{selectedAddress.bname}</span>
                    </div>
                    <div>
                      <label className="font-semibold">Email: </label>
                      <span>{selectedAddress.bemail}</span>
                    </div>
                    <div>
                      <label className="font-semibold">Phone: </label>
                      <span>{selectedAddress.bmobile_no}</span>
                    </div>
                    <Button variant="contained" onClick={handleNext}>
                      Next
                    </Button>
                  </div>
                </div>
              )}
              {activeStep === 2 && (
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Choose Payment Method</h3>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedPaymentMethod === 'Online'}
                          onChange={() => handlePaymentMethodChange('Online')}
                        />
                      }
                      label={
                        <div className="flex items-center space-x-2">
                          <FiCreditCard />
                          <span>Online Payment</span>
                        </div>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedPaymentMethod === 'COD'}
                          onChange={() => handlePaymentMethodChange('COD')}
                        />
                      }
                      label="Cash on Delivery"
                    />
                  </FormGroup>
                  <div className='w-fit flex gap-5 items-center'>
                    <Button variant="contained" color="primary" onClick={handleSubmitOrder}>
                      {selectedPaymentMethod === 'Online' ? 'Make Payment' : 'Place Order'}
                    </Button>
                    <Button variant="outlined" onClick={handleBack}>
                      Back
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="w-full bg-gray-50 p-4 rounded-lg shadow-md">
            <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 mb-4">
              <h3 className="text-2xl font-bold mb-4">Order Details</h3>
              <div className="flex gap-5 items-center mb-4">
                <img
                  src={`https://uoons.com/${productData.product_images}`}
                  alt={productData.product_name}
                  className="w-[100px] h-[100px] object-scale-down rounded-lg"
                />
                <div>
                  <h4 className="font-bold text-lg">{productData.product_name}</h4>
                  <div className="flex flex-row items-center gap-3 mt-3">
                    <h6 className="text-2xl font-semibold">₹{productData.product_sale_price}</h6>
                    <span className="line-through text-gray-500">₹{productData.product_price}</span>
                  </div>
                </div>
              </div>
            </div>
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Product:</span>
                <span>₹{productData.product_sale_price}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span>₹{productData.shipping_charges || 'Free'}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>₹{getTotalPrice()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
