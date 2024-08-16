import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaRegAddressCard, FaBirthdayCake } from 'react-icons/fa';

const UpdateProfile = () => {
  const { register, handleSubmit, reset } = useForm();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get('/api/getUserDetails', {
        headers: {
            auth: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEzNjcwIiwicHJvZmlsZWlkIjoiNDE2MDkyOTU5IiwibmFtZSI6IiIsImVtYWlsIjoiIiwibW9iaWxlX25vIjoiOTE2NTEzOTc0NyIsImZ0b2tlbiI6IjEyMzQiLCJvdHAiOjIwOTksIm90cFZlcmlmaWVkIjpmYWxzZX0.wT5_V2xyPTyYCFGZ0mHYo3LdV5kheFgW8PYWlnQczLo",
            "Channel-Code": "ANDROID"
        }
    })
      .then(response => {
        if (response.data.status === 'success') {
          const data = response.data.Data[0];
          setUserData(data);
          // Pre-fill the form with the fetched data
          reset({
            name: data.name,
            email: data.email,
            mobile_no: data.mobile_no,
            dob: data.dob !== '0000-00-00' ? data.dob : '', // Handle invalid DOB
            address: data.address,
            city: data.city,
            state: data.state,
            pin_code: data.pin_code,
          });
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [reset]);

  const onSubmit = data => {
    axios.post('/api/saveUserDetails', data, {
      headers: {
        auth: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEzNjcwIiwicHJvZmlsZWlkIjoiNDE2MDkyOTU5IiwibmFtZSI6IiIsImVtYWlsIjoiIiwibW9iaWxlX25vIjoiOTE2NTEzOTc0NyIsImZ0b2tlbiI6IjEyMzQiLCJvdHAiOjIwOTksIm90cFZlcmlmaWVkIjpmYWxzZX0.wT5_V2xyPTyYCFGZ0mHYo3LdV5kheFgW8PYWlnQczLo",
        "Channel-Code": "ANDROID"
      }
    })
      .then(response => {
        if (response.data.status === 'success') {
          alert('Profile updated successfully!');
        } else {
          alert('Failed to update profile.');
        }
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-8 bg-white shadow-2xl rounded-3xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <ProfileInput label="Name" icon={<FaUser />} {...register('name')} />
        <ProfileInput label="Email" icon={<FaEnvelope />} {...register('email')} />
        <ProfileInput label="Phone" icon={<FaPhone />} {...register('mobile_no')} />
        <ProfileInput label="Date of Birth" icon={<FaBirthdayCake />} {...register('dob')} type="date" />
        <ProfileInput label="Address" icon={<FaRegAddressCard />} {...register('address')} />
        <ProfileInput label="City" icon={<FaRegAddressCard />} {...register('city')} />
        <ProfileInput label="State" icon={<FaRegAddressCard />} {...register('state')} />
        <ProfileInput label="Pincode" icon={<FaRegAddressCard />} {...register('pin_code')} />
        
        <button 
          type="submit" 
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

const ProfileInput = ({ label, icon, ...props }) => (
  <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
    <div className="text-blue-500 text-xl">{icon}</div>
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <input 
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
        {...props} 
      />
    </div>
  </div>
);

export default UpdateProfile;
