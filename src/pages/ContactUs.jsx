import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser, FaRegEnvelope, FaRegCommentDots } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Header from '../components/Navbar';
import Footer from '../components/Footer';

const ContactUs = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/contactUs', 
      {
        name: data.name,
        email: data.email,
        subject: data.helpTopic,
        message: data.message,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
          'Accept': '*/*',
          'channel-code': 'ANDROID',
          'auth': auth
        }
      }
    );
      console.log(response.data);
      // Handle the response as needed, e.g., show a success message
    } catch (error) {
      console.error(error);
      // Handle the error as needed, e.g., show an error message
    }
  };

  return (
    <>
      <Header />
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900">Contact Us</h1>
            <p className="text-lg text-gray-600 mt-4">We'd love to hear from you! Reach out to us through any of the following ways:</p>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full lg:w-1/3 bg-white p-8 rounded-lg shadow-lg mb-8 lg:mb-0">
              <div className="flex flex-col space-y-6">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-blue-900 text-2xl mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900">Address</h3>
                    <p className="text-gray-600">171 Devi Ahilya Marg, Off. 12, Jail Road, Indore - 452007, Madhya Pradesh, India.</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-blue-900 text-2xl mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900">Phone</h3>
                    <p className="text-gray-600">+91- 9714000456</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-blue-900 text-2xl mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900">Email</h3>
                    <p className="text-gray-600">care@qucons.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/3 bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-blue-900 mb-6">Send us a message</h2>
              <p className="text-gray-600 mb-6">If you have any work from me or any types of queries related to my tutorial, you can send me a message from here. It’s my pleasure to help you.</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="relative">
                    <FaUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your name"
                      className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
                      {...register('name', { required: true })}
                    />
                    {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
                  </div>
                  <div className="relative">
                    <FaRegEnvelope className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
                      {...register('email', { required: true })}
                    />
                    {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
                  </div>
                </div>
                <div className="relative mb-6">
                  <select
                    id="helpTopic"
                    className="pl-4 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
                    {...register('helpTopic', { required: true })}
                  >
                    <option value="">Select a help topic</option>
                    <option value="Order">Order</option>
                    <option value="MobileRepair">Mobile Repair</option>
                    <option value="Laptop/DesktopRepair">Laptop/Desktop Repair</option>
                    <option value="Seller">Seller</option>
                    <option value="Payment">Payment</option>
                    <option value="Cancellation&Returns">Cancellation & Returns</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.helpTopic && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <div className="relative mb-6">
                  <FaRegCommentDots className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                  <textarea
                    id="message"
                    placeholder="Enter your message"
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
                    {...register('message', { required: true })}
                  ></textarea>
                  {errors.message && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <button type="submit" className="w-full py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105">Send Now</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
