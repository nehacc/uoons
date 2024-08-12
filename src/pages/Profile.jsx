import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaBoxOpen, FaHandsHelping } from 'react-icons/fa';
import { IoIosArrowForward, IoIosHeart } from 'react-icons/io';
import { HiLocationMarker } from 'react-icons/hi';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { MdPayments } from 'react-icons/md';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserProfile from '../components/UserProfile';
import UpdateProfile from '../components/UpdateProfile';

const Profile = () => {

    const [activeSection, setActiveSection] = useState("profile")
    const [p, setp] = useState(true)

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };


    return (
        <><Navbar />
        <div className='container border border-black'>
            <div className='w-full flex gap-5'>
                {/* sidebar */}
                <div className="flex flex-col items-center bg-white shadow-lg rounded-2xl p-4 space-y-3 md:text-lg">
                <div className="flex flex-col items-center">
                    <div className="rounded-full overflow-hidden w-[75px] h-[75px] border-4 border-blue-600">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
                        alt="Profile"
                        className="object-cover w-full h-full"
                    />
                    </div>
                    <p className="mt-2 text-lg font-semibold text-gray-800">nameof</p>
                </div>
                {[
                    { label: 'Your Profile', icon: FaUser, section: 'profile' },
                    { label: 'All Notifications', icon: null, section: 'notifications' },
                    { label: 'Wishlist', icon: IoIosHeart, section: 'wishlist' },
                    { label: 'My Orders', icon: FaBoxOpen, section: 'orders' },
                    { label: 'Manage Address', icon: HiLocationMarker, section: 'address' },
                    { label: 'Coupons', icon: RiDiscountPercentFill, section: 'coupons' },
                    { label: 'Manage Payments', icon: MdPayments, section: 'payments' },
                    { label: 'Help & Support', icon: FaHandsHelping, section: 'support' },
                    { label: 'Refer & Earn', icon: null, section: 'refer' },
                ].map((item, index) => (
                    <div
                    key={index}
                    className="flex justify-between items-center gap-3 w-full border border-gray-200 p-3 rounded-lg transition-transform transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                    onClick={() => handleSectionChange(item.section)}
                    >
                    <div className="flex items-center gap-3">
                        {item.icon && React.createElement(item.icon, { className: 'text-blue-600 text-xl' })}
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </div>
                    </div>
                ))}
                </div>


                {activeSection === 'profile' && (
                    <div className='w-full'>
                    {p? <UserProfile />: <UpdateProfile />}
                    <button onClick={()=> setp(!p)}>updateProfile</button>
                    </ div>
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
        <Footer />
        </>
    );
};

export default Profile;
