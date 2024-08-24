import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import UserSession from '../user';
import { FaUser, FaEnvelope, FaPhone, FaRegAddressCard } from 'react-icons/fa';

const UpdateProfile = ({ setIsProfileView }) => {
  const { register, handleSubmit, reset } = useForm();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get('/api/getUserDetails', {
      headers: {
        auth: UserSession.getAuth(),
        'Channel-Code': 'ANDROID',
      },
    })
      .then(response => {
        if (response.data.status === 'success') {
          const data = response.data.Data[0];
          setUserData(data);
          reset({
            fullName: data.name || '',
            email: data.email || '',
            phone: data.mobile_no || '',
            gender: data.gender || '',
            language_spoken: data.language_spoken || '',
            occupation: data.occupation || '',
            about_me: data.about_me || '',
            address: data.address || '',
            pin_code: data.pin_code || '',
            city: data.city || '',
            state: data.state || '',
          });
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [reset]);

  const onSubmit = data => {
    const postData = { ...data, profileid: userData?.profileid };

    axios.post('/api/saveUserDetails', postData, {
      headers: {
        auth: UserSession.getAuth(),
        'Channel-Code': 'ANDROID',
      },
    })
      .then(response => {
        if (response.data.status === 'success') {
          alert('Profile updated successfully!');
          setIsProfileView(true);  // Switch back to the profile view
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
        <ProfileInput label="Full Name" icon={<FaUser />} register={register('fullName')} />
        <ProfileInput label="Email" icon={<FaEnvelope />} register={register('email')} />
        <ProfileInput label="Phone" icon={<FaPhone />} register={register('phone')} />
        <ProfileInput label="Gender" icon={<FaUser />} register={register('gender')} />
        <ProfileInput label="Language Spoken" icon={<FaUser />} register={register('language_spoken')} />
        <ProfileInput label="Occupation" icon={<FaUser />} register={register('occupation')} />
        <ProfileInput label="About Me" icon={<FaUser />} register={register('about_me')} />
        <ProfileInput label="Address" icon={<FaRegAddressCard />} register={register('address')} />
        <ProfileInput label="Pincode" icon={<FaRegAddressCard />} register={register('pin_code')} />
        <ProfileInput label="City" icon={<FaRegAddressCard />} register={register('city')} />
        <ProfileInput label="State" icon={<FaRegAddressCard />} register={register('state')} />

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

const ProfileInput = ({ label, icon, register, ...props }) => (
  <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
    <div className="text-blue-500 text-xl">{icon}</div>
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <input
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        {...register}
        {...props}
      />
    </div>
  </div>
);

export default UpdateProfile;
