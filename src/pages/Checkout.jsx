import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Footer from "../components/Footer";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import LoadingComponent from "../components/LoadingComponent";
import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import UserSession from "../user";
import axios from "axios";
import { FiCreditCard } from "react-icons/fi";
import { useParams } from "react-router-dom";

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
    return <div>Loading... <LoadingComponent/></div>
    
    ;
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
      <div className="w-fit flex gap-5 items-center">
        {/* {activeStep > 0 && ( */}
          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>
        {/* // )} */}
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      </div>
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
    <div className="w-fit flex gap-5 items-center">
      {activeStep > 0 && (
        <Button variant="outlined" onClick={handleBack}>
          Back
        </Button>
      )}
      <Button variant="contained" color="primary" onClick={handleSubmitOrder}>
        {selectedPaymentMethod === 'Online' ? 'Make Payment' : 'Place Order'}
      </Button>
    </div>
  </div>
)}


            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
