import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Logo from '../assets/xlLogoUoons.png'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom';

const LoginSignup2 = () => {
  const [loginForm, setIsLoginForm] = useState(true); // State to toggle between login and register forms
  const [otpFieldVisible, setOtpFieldVisible] = useState(false); // State to control the visibility of the OTP field
  const [message, setMessage] = useState(''); // State to store messages
  const [CurrentUserToken, setCurrentUserToken] = useState("1234") // to be used for every other request!!!
  // const [otp, setotp] = useState(0)

  const [otpVerified, setotpVerified] = useState(false)

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm(); // React Hook Form hooks for form handling

  // Function to toggle between login and signup forms
  const toggleForm = () => {
    setIsLoginForm(!loginForm);
    setOtpFieldVisible(false);
    setMessage('');
    reset(); // Reset form fields
  };

  // Function to handle OTP generation
  const handleGenerateOtp = async (data) => {
    try {
      // Prepare the data to be sent in the POST request
      const formData = {
        mobile_no: data.mobileNumber,
        token: CurrentUserToken,
        referred_by: data.name,
      };

      // Make the POST request using Axios
      const response = await axios.post('api/sendOTP ', formData, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
          // 'Content-Length': '<calculated when request is sent>',
          // 'Host': '<calculated when request is sent>',
          // 'User-Agent': 'PostmanRuntime/7.40.0',
          'Accept': '*/*',
          // 'Accept-Encoding': 'gzip, deflate, br',
          // 'Connection': 'keep-alive',
          'Channel-Code': 'ANDROID',
        },
      });

      console.log('OTP Generation Response:', response.data);

      // Check if the OTP generation was successful
      if (response.data.status === 'success') {
        setOtpFieldVisible(true); // Show the OTP field
        setMessage('OTP has been sent successfully, please check your phone.');
        setCurrentUserToken(response.data.Data.token)
      } else {
        setMessage('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP', error);
      setMessage('Error sending OTP. Please try again.');
    }
  };

  // Function to handle OTP Verification:
  const handleVerifyOtp = async (data) => {
    try {
      // Prepare the data to be sent in the POST request
      const formData = {
        mobile_no: data.mobileNumber,
        otp: data.otp,
      };

      // Make the POST request using Axios
      const response = await axios.post('api/otpVerification', formData, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
          // 'Content-Length': '<calculated when request is sent>',
          // 'Host': '<calculated when request is sent>',
          // 'User-Agent': 'PostmanRuntime/7.40.0',
          'Accept': '*/*',
          // 'Accept-Encoding': 'gzip, deflate, br',
          // 'Connection': 'keep-alive',
          'Channel-Code': 'ANDROID',
          'Auth': CurrentUserToken
        },
      });

      console.log('OTP verification Response:', response.data);

      // Check if the OTP generation was successful
      if (response.data.status === 'success') {
        setOtpFieldVisible(true); // Show the OTP field
        setMessage('OTP Verified Succesfully');
        setotpVerified(true)
        
      } else {
        setMessage('Failed to verify OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP', error);
      setMessage('Error verifying OTP. Please try again.');
    }
  };

  // Placeholder function for registration handling
  const handleRegister = (data) => {
    if(!otpFieldVisible){
      handleGenerateOtp(data)
    }else{
      handleVerifyOtp(data)
    }
  };

  // Placeholder function for login handling
  const handleLogin = (data) => {
    // console.log('Login Data:', data);
    if(!otpFieldVisible){
      handleGenerateOtp(data)
    }else{
      handleVerifyOtp(data)
    }
  };

  const loginUser = () => {
    if(otpVerified){
      navigate('/home')
    }else{
      alert("fill the form first!")
    }
  }
  const registerUser = () => {
    if(otpVerified){
      navigate('/home')
    }else{
      alert("fill the form first!")
    }
  }
  

  return (
    <>
    <Navbar />
    <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl p-8 relative z-20 w-[400px] mx-auto my-10">
      <img src={Logo} alt="uoonsLogo" className="mx-auto my-10" />

      {/* Toggle between login and register forms */}
      <div className="flex justify-between mb-6 border-b-2 border-gray-200 pb-3">
        <h2
          className={`text-2xl font-semibold cursor-pointer transition-colors duration-300 ${loginForm ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}
          onClick={toggleForm}
        >
          Login
        </h2>
        <h2
          className={`text-2xl font-semibold cursor-pointer transition-colors duration-300 ${!loginForm ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}
          onClick={toggleForm}
        >
          Register
        </h2>
      </div>

      {/* Login Form */}
      {loginForm ? (
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="mobileNumber1">
              Mobile Number
            </label>
            <input
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="mobileNumber1"
              type="text"
              placeholder="Enter your mobile number"
              {...register('mobileNumber', { required: 'Mobile number is required' })}
            />
            {errors.mobileNumber && <p className="text-red-500 text-xs italic mt-1">{errors.mobileNumber.message}</p>}
          </div>
          <div className="flex items-center justify-between mb-6">
            <button
              className="bg-gradient-to-r from-blue-500 to-indigo-700 hover:from-indigo-700 hover:to-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              type="submit"
            >
              Generate OTP
            </button>
          </div>
          {otpFieldVisible && (
            <>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="otp">
                  OTP
                </label>
                <input
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="otp"
                  type="text"
                  placeholder="Enter the OTP"

                  {...register('otp', { required: 'OTP is required' })}
                />
                {errors.otp && <p className="text-red-500 text-xs italic mt-1">{errors.otp.message}</p>}
              </div>
              <div className="flex items-center justify-center mb-6">
                <button
                  className="bg-gradient-to-r from-blue-500 to-indigo-700 hover:from-indigo-700 hover:to-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                  type="submit"
                >
                  Verify OTP
                </button>
              </div>
            </>
          )}
          {message && <p className="text-red-500 text-xs italic mt-1 mb-4">{message}</p>}
          <div className="flex items-center justify-between mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              <input className="mr-2 leading-tight" type="checkbox" />
              Remember Me
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-red-600 hover:to-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={loginUser}
            >
              Login
            </button>
            {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot password?
            </a> */}
          </div>
        </form>
      ) : (
        // Register Form
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="mobileNumber">
              Mobile Number
            </label>
            <input
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="mobileNumber"
              type="text"
              placeholder="Enter your mobile number"
              {...register('mobileNumber', { required: 'Mobile number is required' })}
            />
            {errors.mobileNumber && <p className="text-red-500 text-xs italic mt-1">{errors.mobileNumber.message}</p>}
          </div>
          <div className="flex items-center justify-between mb-6">
            <button
              className="bg-gradient-to-r from-blue-500 to-indigo-700 hover:from-indigo-700 hover:to-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              type="submit"
            >
              Generate OTP
            </button>
          </div>
          {otpFieldVisible && (
            <>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="otp">
                  OTP
                </label>
                <input
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="otp"
                  type="text"
                  placeholder="Enter the OTP"
                  {...register('otp', { required: 'OTP is required' })}
                />
                {errors.otp && <p className="text-red-500 text-xs italic mt-1">{errors.otp.message}</p>}
              </div>
              <div className="flex items-center justify-center mb-6">
                <button
                  className="bg-gradient-to-r from-blue-500 to-indigo-700 hover:from-indigo-700 hover:to-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                  type="submit"
                >
                  Verify OTP
                </button>
              </div>
            </>
          )}
          {message && <p className="text-red-500 text-xs italic mt-1 mb-4">{message}</p>}


          <div className="flex items-center justify-between">
            <button
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-red-600 hover:to-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={registerUser}
            >
              Register
            </button>
            {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot password?
            </a> */}
          </div>
        </form>
      )}
    </div>
    <Footer />
    </>

  );
};

export default LoginSignup2;
