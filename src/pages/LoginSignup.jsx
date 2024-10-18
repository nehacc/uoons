import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Logo from '../assets/uoonsLogoXl.png';
import Navbar from '../components/Navbar';
import LowerNavbar from '../components/LowerNavbar';
import Test345 from '../pages/Test345'
import { useNavigate, Link } from 'react-router-dom';
import UserSession from '../user';

const LoginSignup = () => {
  const [loginForm, setIsLoginForm] = useState(true);
  const [otpFieldVisible, setOtpFieldVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [currentUserToken, setCurrentUserToken] = useState("1234");
  const [otpVerified, setOtpVerified] = useState(false);

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const toggleForm = () => {
    setIsLoginForm(!loginForm);
    setOtpFieldVisible(false);
    setMessage('');
    reset();
  };

  const handleGenerateOtp = async (data) => {
    try {
      const formData = {
        mobile_no: data.mobileNumber,
        token: currentUserToken,
        referred_by: data.name,
      };

      const response = await axios.post('api/sendOTP', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': '*/*',
          'Channel-Code': 'ANDROID',
        },
      });

      if (response.data.status === 'success') {
        setOtpFieldVisible(true);
        setMessage('OTP has been sent successfully. Please check your phone.');
        setCurrentUserToken(response.data.Data.token);
      } else {
        setMessage('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      setMessage('Error sending OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async (data) => {
    try {
      const formData = {
        mobile_no: data.mobileNumber,
        otp: data.otp,
      };

      const response = await axios.post('api/otpVerification', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': '*/*',
          'Channel-Code': 'ANDROID',
          'Auth': currentUserToken,
        },
      });

      if (response.data.status === 'success') {
        setMessage('OTP Verified Successfully');
        setOtpVerified(true);
      } else {
        setMessage('Failed to verify OTP. Please try again.');
      }
    } catch (error) {
      setMessage('Error verifying OTP. Please try again.');
    }
  };

  const handleRegister = (data) => {
    if (!otpFieldVisible) {
      handleGenerateOtp(data);
    } else {
      handleVerifyOtp(data);
    }
  };

  const handleLogin = (data) => {
    if (!otpFieldVisible) {
      handleGenerateOtp(data);
    } else {
      handleVerifyOtp(data);
    }
  };

  const startSession = () => {
    if (otpVerified) {
      UserSession.setSession(true);
      UserSession.setAuth(currentUserToken);
      navigate('/home');
    } else {
      setMessage('Please complete the form first!');
    }
  };

  if (UserSession.getSession()) {
    return (
      <>
        <Navbar />
        <LowerNavbar />
        <div className="flex items-center justify-center my-9">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">You are already logged in</h2>
            <p className="text-gray-600 mb-6">You can go back to the homepage to continue browsing.</p>
            <Link
              to="/home"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition duration-300"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
        <Test345 />
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <LowerNavbar />
        <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl p-8 relative z-20 w-[400px] mx-auto my-10">
          <img src={Logo} alt="uoonsLogo" className="mx-auto my-10" />
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
              {/* <div className="mb-4">
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
                {errors.name && (
                  <p className="bg-red-100 w-fit text-red-700 text-xs italic mt-1 p-2 rounded">{errors.name.message}</p>
                )}
              </div> */}
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
                {errors.mobileNumber && (
                  <p className="bg-red-100 w-fit text-red-700 text-xs font-semibold italic mt-1 p-2 rounded">{errors.mobileNumber.message}</p>
                )}
              </div>
              <div className="flex items-center justify-between mb-6">
                {/* <button
                  type="submit"
                  className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-orange-600 active:shadow-none shadow-lg bg-gradient-to-tr from-orange-600 to-orange-500 border-orange-700 text-white"
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span className="relative">Generate OTP</span>
                </button> */}
                <button
                  type="submit"
                  className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-blue-600 active:shadow-none shadow-lg bg-gradient-to-tr from-blue-600 to-blue-500 border-blue-700 text-white"
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span className="relative">Generate OTP</span>
                </button>



              </div>
              {otpFieldVisible && (
                <>
                  <div className="mb-6 flex items-center justify-center gap-2">
                    <label className="block text-gray-500 text-lg font-medium mb-2" htmlFor="otp">
                      OTP:
                    </label>
                    <input
                      className="shadow-sm w-[126px] appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="otp"
                      type="text"
                      placeholder="Enter the OTP"
                      {...register('otp', { required: 'OTP is required' })}
                    />
                    {errors.otp && (
                      <p className="bg-red-100 w-fit text-red-700 text-xs font-semibold italic mt-1 p-2 rounded">{errors.otp.message}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-center mb-6">
                    <button
                      type="submit"
                      className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-orange-600 active:shadow-none shadow-lg bg-gradient-to-tr from-orange-600 to-orange-500 border-orange-700 text-white"
                    >
                      <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                      <span className="relative">Verify OTP</span>
                    </button>
                  </div>
                </>
              )}
              {message && (
                <p className="bg-yellow-100 w-fit text-yellow-700 text-xs font-semibold italic mt-1 mb-4 p-2 rounded">{message}</p>
              )}
              <div className="flex items-center justify-between mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  <input className="mr-2 leading-tight" type="checkbox" />
                  Remember Me
                </label>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={startSession}
                  className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-orange-600 active:shadow-none shadow-lg bg-gradient-to-tr from-orange-600 to-orange-500 border-orange-700 text-white"
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span className="relative">Login</span>
                </button>
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
                {errors.name && (
                  <p className="bg-red-100 w-fit text-red-700 text-xs italic mt-1 p-2 rounded">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="mobileNumber2">
                  Mobile Number
                </label>
                <input
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="mobileNumber2"
                  type="text"
                  placeholder="Enter your mobile number"
                  {...register('mobileNumber', { required: 'Mobile number is required' })}
                />
                {errors.mobileNumber && (
                  <p className="bg-red-100 w-fit text-red-700 text-xs italic mt-1 p-2 rounded">{errors.mobileNumber.message}</p>
                )}
              </div>
              <div className="flex items-center justify-between mb-6">
                <button
                  type="submit"
                  className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-blue-600 active:shadow-none shadow-lg bg-gradient-to-tr from-blue-600 to-blue-500 border-blue-700 text-white"
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span className="relative">Generate OTP</span>
                </button>
              </div>
              {otpFieldVisible && (
                <>
                  <div className="mb-6 flex items-center justify-center gap-2">
                    <label className="block text-gray-500 text-lg font-medium mb-2" htmlFor="otp">
                      OTP:
                    </label>
                    <input
                      className="shadow-sm w-[126px] appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="otp"
                      type="text"
                      placeholder="Enter the OTP"
                      {...register('otp', { required: 'OTP is required' })}
                    />
                    {errors.otp && (
                      <p className="bg-red-100 w-fit text-red-700 text-xs italic mt-1 p-2 rounded">{errors.otp.message}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-center mb-6">
                    <button
                      type="submit"
                      className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-orange-600 active:shadow-none shadow-lg bg-gradient-to-tr from-orange-600 to-orange-500 border-orange-700 text-white"
                    >
                      <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                      <span className="relative">Verify OTP</span>
                    </button>
                  </div>
                </>
              )}
              {message && (
                <p className="bg-yellow-100 w-fit text-yellow-700 text-xs italic mt-1 mb-4 p-2 rounded">{message}</p>
              )}
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={startSession}
                  className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-orange-600 active:shadow-none shadow-lg bg-gradient-to-tr from-orange-600 to-orange-500 border-orange-700 text-white"
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span className="relative">Register</span>
                </button>
              </div>
            </form>
          )}
        </div>
        <Test345 />
      </>
    );
  }
};

export default LoginSignup;
