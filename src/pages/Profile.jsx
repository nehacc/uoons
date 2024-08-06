import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaBoxOpen, FaHandsHelping } from 'react-icons/fa';
import { IoIosArrowForward, IoIosHeart } from 'react-icons/io';
import { HiLocationMarker } from 'react-icons/hi';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { MdPayments } from 'react-icons/md';
import Logo from '../assets/uoonsLogoXl.png';
import axios from 'axios';

const Profile = () => {
    const auth = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjMwNCIsInByb2ZpbGVpZCI6IjIwMDM1Mjk4NTYiLCJuYW1lIjoiQ2hhbmRhbiBWZXJtYSIsImVtYWlsIjoidW9vbnNlbnRlcnByaXNlc0BnbWFpbC5jb20iLCJtb2JpbGVfbm8iOiI4ODcxMTMzOTU3IiwiZnRva2VuIjoiZmZSZllZcmZRcUNXR0ZmYmR5YkFFZjpBUEE5MWJGR243WUg0R29pQUdyRHY0a2dNLS0zX05nWDlyUzljN0o5MmlVSGZJVlFHOUNFeXpMWkpoV0NZRElKWlZYSUxjREhSTGNPVFpGaW9YT1hyN0lwcDlMRS1HSF9Mdi1oMl9CeEJ1U3dBUnpub3lxTzhCR3NoaDNVWlhPNFl6bE9iNURaTnY4ZiIsIm90cCI6NTM4Miwib3RwVmVyaWZpZWQiOmZhbHNlfQ.Yw0iir3wyTkaQIPY3i0z7C9PKEDOjlpHnHXATfjHJb8";

    const [userData, setUserData] = useState(null);
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
            try {
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
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };
        fetchUserData();
    }, [auth]);

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateFormData({
            ...updateFormData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/saveUserDetails", updateFormData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'channel-code': 'ANDROID',
                    'auth': auth
                }
            });
            setShowUpdateForm(false);
            setUserData(response.data.updatedData); // Assuming the response includes the updated data
        } catch (error) {
            console.error("Error saving user data", error);
        }
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
                    <div className='flex justify-between items-center w-[300px] border hover:shadow-2xl p-2 rounded-xl' onClick={() => handleSectionChange('refer')}>
                        <div className='flex items-center gap-2'>Refer & Earn</div>
                        <div><IoIosArrowForward /></div>
                    </div>
                </div>

                {activeSection === 'profile' && (
                    <div className='w-full'>
                        <div className='flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full gap-4 md:gap-6'>
                            <div className='flex flex-col justify-center items-center text-lg md:text-xl'>
                                <div className='flex items-center justify-center'>
                                    <img src={Logo} alt="Logo" className='w-[300px] mb-6' />
                                </div>
                                {showUpdateForm ? (
                                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 md:gap-6'>
                                        <input type="text" name="name" value={updateFormData.name} onChange={handleInputChange} placeholder="Name" />
                                        <input type="email" name="email" value={updateFormData.email} onChange={handleInputChange} placeholder="Email" />
                                        <input type="tel" name="mobile_no" value={updateFormData.mobile_no} onChange={handleInputChange} placeholder="Mobile No" />
                                        <input type="text" name="gender" value={updateFormData.gender} onChange={handleInputChange} placeholder="Gender" />
                                        <textarea name="about_me" value={updateFormData.about_me} onChange={handleInputChange} placeholder="About Me"></textarea>
                                        <input type="text" name="pin_code" value={updateFormData.pin_code} onChange={handleInputChange} placeholder="Pin Code" />
                                        <input type="text" name="city" value={updateFormData.city} onChange={handleInputChange} placeholder="City" />
                                        <input type="text" name="state" value={updateFormData.state} onChange={handleInputChange} placeholder="State" />
                                        <button type="submit">Save</button>
                                    </form>
                                ) : (
                                    <div className='flex flex-col gap-4 md:gap-6'>
                                        <div className='flex items-center gap-2'><FaUser className='text-blue-600' />{userData.name}</div>
                                        <div className='flex items-center gap-2'><FaEnvelope className='text-blue-600' />{userData.email}</div>
                                        <div className='flex items-center gap-2'><FaPhone className='text-blue-600' />{userData.mobile_no}</div>
                                        <div className='flex items-center gap-2'><FaUser className='text-blue-600' />{userData.gender}</div>
                                        <div className='flex items-center gap-2'><FaHome className='text-blue-600' />{userData.pin_code}</div>
                                        <div className='flex items-center gap-2'><FaHome className='text-blue-600' />{userData.city}</div>
                                        <div className='flex items-center gap-2'><FaHome className='text-blue-600' />{userData.state}</div>
                                        <button onClick={() => setShowUpdateForm(true)}>Edit</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'notifications' && (
                    <div className='w-full'>
                        <div className='flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full gap-4 md:gap-6'>
                            <h2>Notifications</h2>
                            <p>Your notifications will be shown here.</p>
                        </div>
                    </div>
                )}

                {activeSection === 'wishlist' && (
                    <div className='w-full'>
                        <div className='flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full gap-4 md:gap-6'>
                            <h2>Wishlist</h2>
                            <p>Your wishlist will be shown here.</p>
                        </div>
                    </div>
                )}

                {activeSection === 'orders' && (
                    <div className='w-full'>
                        <div className='flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full gap-4 md:gap-6'>
                            <h2>My Orders</h2>
                            <p>Your orders will be shown here.</p>
                        </div>
                    </div>
                )}

                {activeSection === 'address' && (
                    <div className='w-full'>
                        <div className='flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full gap-4 md:gap-6'>
                            <h2>Manage Address</h2>
                            <p>Your addresses will be shown here.</p>
                        </div>
                    </div>
                )}

                {activeSection === 'coupons' && (
                    <div className='w-full'>
                        <div className='flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full gap-4 md:gap-6'>
                            <h2>Coupons</h2>
                            <p>Your coupons will be shown here.</p>
                        </div>
                    </div>
                )}

                {activeSection === 'payments' && (
                    <div className='w-full'>
                        <div className='flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full gap-4 md:gap-6'>
                            <h2>Manage Payments</h2>
                            <p>Your payment methods will be shown here.</p>
                        </div>
                    </div>
                )}

                {activeSection === 'support' && (
                    <div className='w-full'>
                        <div className='flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full gap-4 md:gap-6'>
                            <h2>Help & Support</h2>
                            <p>Your support options will be shown here.</p>
                        </div>
                    </div>
                )}

                {activeSection === 'refer' && (
                    <div className='w-full'>
                        <div className='flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full gap-4 md:gap-6'>
                            <h2>Refer & Earn</h2>
                            <p>Your refer and earn options will be shown here.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
