import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaBoxOpen, FaHandsHelping } from 'react-icons/fa';
import { IoIosArrowForward, IoIosHeart } from 'react-icons/io';
import { HiLocationMarker } from 'react-icons/hi';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { MdPayments } from 'react-icons/md';
import Logo from '../assets/xlLogoUoons.png';
import axios from 'axios';

const Profile = (props) => {
    // const auth = props.auth
    // for now
    const auth = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjMwNCIsInByb2ZpbGVpZCI6IjIwMDM1Mjk4NTYiLCJuYW1lIjoiQ2hhbmRhbiBWZXJtYSIsImVtYWlsIjoidW9vbnNlbnRlcnByaXNlc0BnbWFpbC5jb20iLCJtb2JpbGVfbm8iOiI4ODcxMTMzOTU3IiwiZnRva2VuIjoiZmZSZllZcmZRcUNXR0ZmYmR5YkFFZjpBUEE5MWJGR243WUg0R29pQUdyRHY0a2dNLS0zX05nWDlyUzljN0o5MmlVSGZJVlFHOUNFeXpMWkpoV0NZRElKWlZYSUxjREhSTGNPVFpGaW9YT1hyN0lwcDlMRS1HSF9Mdi1oMl9CeEJ1U3dBUnpub3lxTzhCR3NoaDNVWlhPNFl6bE9iNURaTnY4ZiIsIm90cCI6NTM4Miwib3RwVmVyaWZpZWQiOmZhbHNlfQ.Yw0iir3wyTkaQIPY3i0z7C9PKEDOjlpHnHXATfjHJb8";

    const [userData, setUserData] = useState([]);
    const [activeSection, setActiveSection] = useState('profile');
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [updateFormData, setUpdateFormData] = useState({
        name: '',
        email: '',
        mobile_no: '',
        gender: '',
        about_me: '',
        pin_code: '',
        city: '',
        state: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await axios.get("/api/getUserDetails", {
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                    'Accept': '*/*',
                    'channel-code': 'ANDROID',
                    'auth': auth
                }
            });
            const fetchedUserData = response.data.Data[0];
            setUserData(fetchedUserData);
            setUpdateFormData({
                name: fetchedUserData.name,
                email: fetchedUserData.email,
                mobile_no: fetchedUserData.mobile_no,
                gender: fetchedUserData.gender,
                about_me: fetchedUserData.about_me,
                pin_code: fetchedUserData.pin_code,
                city: fetchedUserData.city,
                state: fetchedUserData.state
            });
        };
        fetchUserData();
    }, []);

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("/api/saveUserDetails", formData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'channel-code': 'ANDROID',
                'auth': auth
            }
        });
        setShowUpdateForm(false);
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-screen h-screen bg-blue-100 flex justify-center items-center'>
            <div className='flex flex-col md:flex-row text-lg md:text-xl gap-4 md:gap-6'>

                <div className='flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full md:w-auto gap-4 md:gap-6'>
                    <div className='flex flex-col items-center'>
                        <div className='rounded-full overflow-hidden w-[75px]'>
                            <img src={userData.profile || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"} alt="Profile" className='object-contain' />
                        </div>
                        <p>{userData.name}</p>
                    </div>

                    <div className='flex justify-between items-center w-[300px] border hover:shadow-2xl p-2 rounded-xl' onClick={() => handleSectionChange('profile')}>
                        <div className='flex items-center gap-2'><FaUser className='text-blue-600' />Your profile</div>
                        <div><IoIosArrowForward /></div>
                    </div>

                    <div className='flex justify-between items-center w-[300px] border hover:shadow-2xl p-2 rounded-xl' onClick={() => handleSectionChange('notifications')}>
                        <div className='flex items-center gap-2'>All Notifications</div>
                        <div><IoIosArrowForward /></div>
                    </div>

                    <div className='flex justify-between items-center w-[300px] border hover:shadow-2xl p-2 rounded-xl' onClick={() => handleSectionChange('wishlist')}>
                        <div className='flex items-center gap-2'><IoIosHeart className='text-blue-600' />Wishlist</div>
                        <div><IoIosArrowForward /></div>
                    </div>

                    <div className='flex justify-between items-center w-[300px] border hover:shadow-2xl p-2 rounded-xl' onClick={() => handleSectionChange('orders')}>
                        <div className='flex items-center gap-2'><FaBoxOpen className='text-blue-600' />My Orders</div>
                        <div><IoIosArrowForward /></div>
                    </div>

                    <div className='flex justify-between items-center w-[300px] border hover:shadow-2xl p-2 rounded-xl' onClick={() => handleSectionChange('address')}>
                        <div className='flex items-center gap-2'><HiLocationMarker className='text-blue-600' />Manage Address</div>
                        <div><IoIosArrowForward /></div>
                    </div>

                    <div className='flex justify-between items-center w-[300px] border hover:shadow-2xl p-2 rounded-xl' onClick={() => handleSectionChange('coupons')}>
                        <div className='flex items-center gap-2'><RiDiscountPercentFill className='text-blue-600' />Coupons</div>
                        <div><IoIosArrowForward /></div>
                    </div>

                    <div className='flex justify-between items-center w-[300px] border hover:shadow-2xl p-2 rounded-xl' onClick={() => handleSectionChange('payments')}>
                        <div className='flex items-center gap-2'><MdPayments className='text-blue-600' />Manage Payments</div>
                        <div><IoIosArrowForward /></div>
                    </div>

                    <div className='flex justify-between items-center w-[300px] border hover:shadow-2xl p-2 rounded-xl' onClick={() => handleSectionChange('support')}>
                        <div className='flex items-center gap-2'><FaHandsHelping className='text-blue-600' />Help & Support</div>
                        <div><IoIosArrowForward /></div>
                    </div>

                    <div className='flex justify-between items-center w-[300px] border hover:shadow-2xl p-2 rounded-xl' onClick={() => handleSectionChange('about')}>
                        <div className='flex items-center gap-2'><img src={Logo} className='w-[1.7rem] object-contain' />About us</div>
                        <div><IoIosArrowForward /></div>
                    </div>
                </div>

                <div className='flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full md:w-[800px] gap-6'>
                {activeSection === 'profile' && (
                        <div className="container mx-auto p-6">
                            <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
                                <h2 className="text-3xl font-bold mb-4 text-center">User Profile</h2>
                                <div className="w-full">
                                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                                        <FaUser className="mr-2 text-blue-500" /> Name
                                    </h3>
                                    <div className="mb-4">
                                        <p className="mt-1 p-2 border border-gray-300 rounded-md">{userData.name}</p>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                                        <FaPhone className="mr-2 text-green-500" /> Mobile Number
                                    </h3>
                                    <div className="mb-4">
                                        <p className="mt-1 p-2 border border-gray-300 rounded-md">{userData.mobile_no}</p>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                                        <FaEnvelope className="mr-2 text-red-500" /> Password
                                    </h3>
                                    <div className="mb-4">
                                        <p className="mt-1 p-2 border border-gray-300 rounded-md">********</p>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                                        <FaHome className="mr-2 text-yellow-500" /> Address
                                    </h3>
                                    <div className="mb-4">
                                        <p className="mt-1 p-2 border border-gray-300 rounded-md">{userData.address}</p>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                                        <HiLocationMarker className="mr-2 text-purple-500" /> Pin Code
                                    </h3>
                                    <div className="mb-4">
                                        <p className="mt-1 p-2 border border-gray-300 rounded-md">{userData.pin_code}</p>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                                        <HiLocationMarker className="mr-2 text-purple-500" /> City
                                    </h3>
                                    <div className="mb-4">
                                        <p className="mt-1 p-2 border border-gray-300 rounded-md">{userData.city}</p>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                                        <HiLocationMarker className="mr-2 text-purple-500" /> State
                                    </h3>
                                    <div className="mb-4">
                                        <p className="mt-1 p-2 border border-gray-300 rounded-md">{userData.state}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {showUpdateForm && (
                        <div className="container mx-auto p-6">
                            <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
                                <h2 className="text-3xl font-bold mb-4 text-center">Update Profile</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="w-full">
                                        <label className="block text-lg font-semibold">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={updateFormData.name}
                                            onChange={handleInputChange}
                                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-lg font-semibold">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={updateFormData.email}
                                            onChange={handleInputChange}
                                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-lg font-semibold">Phone</label>
                                        <input
                                            type="tel"
                                            name="mobile_no"
                                            value={updateFormData.mobile_no}
                                            onChange={handleInputChange}
                                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-lg font-semibold">Gender</label>
                                        <input
                                            type="text"
                                            name="gender"
                                            value={updateFormData.gender}
                                            onChange={handleInputChange}
                                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-lg font-semibold">About Me</label>
                                        <textarea
                                            name="about_me"
                                            value={updateFormData.about_me}
                                            onChange={handleInputChange}
                                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-lg font-semibold">Pincode</label>
                                        <input
                                            type="text"
                                            name="pin_code"
                                            value={updateFormData.pin_code}
                                            onChange={handleInputChange}
                                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-lg font-semibold">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={updateFormData.city}
                                            onChange={handleInputChange}
                                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-lg font-semibold">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={updateFormData.state}
                                            onChange={handleInputChange}
                                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Submit</button>
                                        <button type="button" onClick={() => setShowUpdateForm(false)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {activeSection === 'notifications' && (
                        <div className='text-center'>
                            <h2 className="text-2xl font-bold mb-4">All Notifications</h2>
                            {/* Add your notifications content here */}
                        </div>
                    )}
                    {activeSection === 'wishlist' && (
                        <div className='text-center'>
                            <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
                            {/* Add your wishlist content here */}
                        </div>
                    )}
                    {activeSection === 'orders' && (
                        <div className='text-center'>
                            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
                            {/* Add your orders content here */}
                        </div>
                    )}
                    {activeSection === 'address' && (
                        <div className='text-center'>
                            <h2 className="text-2xl font-bold mb-4">Manage Address</h2>
                            {/* Add your address management content here */}
                        </div>
                    )}
                    {activeSection === 'coupons' && (
                        <div className='text-center'>
                            <h2 className="text-2xl font-bold mb-4">Coupons</h2>
                            {/* Add your coupons content here */}
                        </div>
                    )}
                    {activeSection === 'payments' && (
                        <div className='text-center'>
                            <h2 className="text-2xl font-bold mb-4">Manage Payments</h2>
                            {/* Add your payment management content here */}
                        </div>
                    )}
                    {activeSection === 'support' && (
                        <div className='text-center'>
                            <h2 className="text-2xl font-bold mb-4">Help & Support</h2>
                            {/* Add your help and support content here */}
                        </div>
                    )}
                    {activeSection === 'about' && (
                        <div className='text-center'>
                            <h2 className="text-2xl font-bold mb-4">About Us</h2>
                            {/* Add your about us content here */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
