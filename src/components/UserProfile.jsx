import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaPhone, FaRegAddressCard, FaBirthdayCake, FaUser, FaTag, FaMapPin, FaInfoCircle } from 'react-icons/fa';
import UserSession from '../user';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get('/api/getUserDetails', {
      headers: {
        "auth": UserSession.getAuth(),
        "Channel-Code": "ANDROID"
      }
    })
      .then(response => {
        if (response.data.status === 'success') {
          setUserData(response.data.Data[0]);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  const getDisplayValue = (value, defaultValue = 'Not Provided') => {
    return value && value.trim() !== '' ? value : defaultValue;
  };

  return (
    <div className="w-full p-8 bg-gradient-to-r from-blue-100 to-purple-100 shadow-2xl rounded-3xl">
      <div className="flex items-center space-x-6">
        <img 
          src={userData.profile || 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'}
          alt="User Profile" 
          className="w-32 h-32 rounded-full shadow-lg border-4 border-white" 
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{getDisplayValue(userData.name, 'User Name')}</h1>
          <p className="text-sm text-gray-500">Profile ID: {getDisplayValue(userData.profileid, 'N/A')}</p>
        </div>
      </div>
      <div className="mt-10 space-y-6">
        <ProfileItem icon={<FaUser />} label="Gender" value={getDisplayValue(userData.gender)} />
        <ProfileItem icon={<FaEnvelope />} label="Email" value={getDisplayValue(userData.email)} />
        <ProfileItem icon={<FaPhone />} label="Phone" value={getDisplayValue(userData.mobile_no)} />
        <ProfileItem icon={<FaBirthdayCake />} label="Date of Birth" value={userData.dob !== '0000-00-00' ? getDisplayValue(userData.dob) : 'Not Provided'} />
        <ProfileItem icon={<FaRegAddressCard />} label="Address" value={`${getDisplayValue(userData.address)}, ${getDisplayValue(userData.city)}, ${getDisplayValue(userData.state)}, ${getDisplayValue(userData.pin_code)}`} />
        <ProfileItem icon={<FaInfoCircle />} label="About Me" value={getDisplayValue(userData.about_me)} />
        <ProfileItem icon={<FaTag />} label="Referral Code" value={getDisplayValue(userData.referal)} />
        <ProfileItem icon={<FaMapPin />} label="City" value={getDisplayValue(userData.city)} />
        <ProfileItem icon={<FaMapPin />} label="State" value={getDisplayValue(userData.state)} />
        <ProfileItem icon={<FaMapPin />} label="Pincode" value={getDisplayValue(userData.pin_code)} />
      </div>
    </div>
  );
};

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-lg hover:bg-blue-50 transition duration-200">
    <div className="text-blue-500 text-xl">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default UserProfile;
