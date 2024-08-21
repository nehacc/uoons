import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import UserSession from '../user';

const InsertUserAddress = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/insertUserAddress', data, {
        headers: {
          auth: UserSession.getAuth(),
          'channel-code': 'ANDROID',
        },
      });
      console.log('Address submitted successfully:', response.data);
      onSuccess()
    } catch (error) {
      console.error('Error submitting address:', error);
    }
  };

  return (
    <div className="w-3/4 mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Address</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Address Type */}
        <div>
          <label className="block text-gray-700">Address Type</label>
          <input
            {...register('addressType', { required: 'Address Type is required' })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., Home, Office"
          />
          {errors.addressType && <p className="text-red-600 text-sm mt-1">{errors.addressType.message}</p>}
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input
            {...register('fullName', { required: 'Full Name is required' })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>}
        </div>

        {/* Mobile No */}
        <div>
          <label className="block text-gray-700">Mobile No</label>
          <input
            {...register('mobileNo', { required: 'Mobile No is required' })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your mobile number"
          />
          {errors.mobileNo && <p className="text-red-600 text-sm mt-1">{errors.mobileNo.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
            })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your email address"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Address 1 */}
        <div>
          <label className="block text-gray-700">Address 1</label>
          <input
            {...register('address1', { required: 'Address 1 is required' })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Street address, P.O. box"
          />
          {errors.address1 && <p className="text-red-600 text-sm mt-1">{errors.address1.message}</p>}
        </div>

        {/* Address 2 */}
        <div>
          <label className="block text-gray-700">Address 2</label>
          <input
            {...register('address2')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Apartment, suite, unit, building, floor, etc."
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-gray-700">Country</label>
          <input
            {...register('country', { required: 'Country is required' })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your country"
          />
          {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country.message}</p>}
        </div>

        {/* City */}
        <div>
          <label className="block text-gray-700">City</label>
          <input
            {...register('city', { required: 'City is required' })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your city"
          />
          {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>}
        </div>

        {/* State */}
        <div>
          <label className="block text-gray-700">State</label>
          <input
            {...register('state', { required: 'State is required' })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your state"
          />
          {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>}
        </div>

        {/* Pin Code */}
        <div>
          <label className="block text-gray-700">Pin Code</label>
          <input
            {...register('pinCode', { required: 'Pin Code is required' })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your pin code"
          />
          {errors.pinCode && <p className="text-red-600 text-sm mt-1">{errors.pinCode.message}</p>}
        </div>

        {/* Save as Shipping Address */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            {...register('saveAsShippingAddress')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-gray-900">Save as Shipping Address</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InsertUserAddress;
