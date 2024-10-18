// import React, { useState } from 'react';
// import { FaUser, FaBoxOpen, FaHandsHelping } from 'react-icons/fa';
// import { IoIosHeart } from 'react-icons/io';
// import { HiLocationMarker } from 'react-icons/hi';
// import { RiDiscountPercentFill } from 'react-icons/ri';
// import { MdPayments } from 'react-icons/md';
// import { IoIosNotifications } from "react-icons/io";

// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import UserProfile from '../components/UserProfile';
// import UpdateProfile from '../components/UpdateProfile';

// const Profile = () => {

//     const [activeSection, setActiveSection] = useState("profile")
//     const [p, setp] = useState(true)

//     const handleSectionChange = (section) => {
//         setActiveSection(section);
//     };


//     return (
//         <>
//         <Navbar />
//         <div className='w-full m-8 border '>
//             <div className='w-full flex gap-5'>
//                 {/* sidebar */}
//                 <div className="flex flex-col items-center bg-white shadow-lg rounded-2xl p-4 space-y-3 md:text-lg">
//                 <div className="flex flex-col items-center">
//                     <div className="rounded-full overflow-hidden w-[75px] h-[75px] border-4 border-blue-600">
//                     <img
//                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
//                         alt="Profile"
//                         className="object-cover w-full h-full"
//                     />
//                     </div>
//                     <p className="mt-2 text-lg font-semibold text-gray-800">nameofUser</p>
//                 </div>
//                 {[
//                     { label: 'Your Profile', icon: FaUser, section: 'profile' },
//                     { label: 'All Notifications', icon: IoIosNotifications, section: 'notifications' },
//                     { label: 'Wishlist', icon: IoIosHeart, section: 'wishlist' },
//                     { label: 'My Orders', icon: FaBoxOpen, section: 'orders' },
//                     { label: 'Manage Address', icon: HiLocationMarker, section: 'address' },
//                     { label: 'Coupons', icon: RiDiscountPercentFill, section: 'coupons' },
//                     { label: 'Manage Payments', icon: MdPayments, section: 'payments' },
//                     { label: 'Help & Support', icon: FaHandsHelping, section: 'support' },
//                     { label: 'Refer & Earn', icon: null, section: 'refer' },
//                 ].map((item, index) => (
//                     <div
//                     key={index}
//                     className="flex justify-between items-center gap-3 w-full border border-gray-200 p-3 rounded-lg transition-transform transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
//                     onClick={() => handleSectionChange(item.section)}
//                     >
//                     <div className="flex items-center gap-3">
//                         {item.icon && React.createElement(item.icon, { className: 'text-blue-600 text-xl' })}
//                         <span className="text-sm font-medium text-gray-700">{item.label}</span>
//                     </div>
//                     </div>
//                 ))}
//                 </div>


//                 {activeSection === 'profile' && (
//                     <div className='w-custom2'>
//                     {p ? <UserProfile /> : <UpdateProfile />}
//                     {p && (
//                       <div className='flex justify-center mt-5'>
//                         <a 
//                           onClick={() => setp(!p)} 
//                           className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm"
//                         >
//                           updateProfile
//                         </a>
//                       </div>
//                     )}
//                   </div>
                  
                  
//                 )}

//                 {activeSection === 'notifications' && (
//                     <div className='w-custom2'>
//                         <div className='flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full gap-4 md:gap-6'>
//                             <h2>Notifications</h2>
//                             <p>Your notifications will be shown here.</p>
//                         </div>
//                     </div>
//                 )}

//                 {activeSection === 'wishlist' && (
//                     <div className='w-full'>
//                         <div className='flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full gap-4 md:gap-6'>
//                             <h2>Wishlist</h2>
//                             <p>Your wishlist will be shown here.</p>
//                         </div>
//                     </div>
//                 )}

//                 {activeSection === 'orders' && (
//                     <div className='w-full'>
//                         <div className='flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full gap-4 md:gap-6'>
//                             <h2>My Orders</h2>
//                             <p>Your orders will be shown here.</p>
//                         </div>
//                     </div>
//                 )}

//                 {activeSection === 'address' && (
//                     <div className='w-full'>
//                         <div className='flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full gap-4 md:gap-6'>
//                             <h2>Manage Address</h2>
//                             <p>Your addresses will be shown here.</p>
//                         </div>
//                     </div>
//                 )}

//                 {activeSection === 'coupons' && (
//                     <div className='w-full'>
//                         <div className='flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full gap-4 md:gap-6'>
//                             <h2>Coupons</h2>
//                             <p>Your coupons will be shown here.</p>
//                         </div>
//                     </div>
//                 )}

//                 {activeSection === 'payments' && (
//                     <div className='w-full'>
//                         <div className='flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full gap-4 md:gap-6'>
//                             <h2>Manage Payments</h2>
//                             <p>Your payment methods will be shown here.</p>
//                         </div>
//                     </div>
//                 )}

//                 {activeSection === 'support' && (
//                     <div className='w-full'>
//                         <div className='flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full gap-4 md:gap-6'>
//                             <h2>Help & Support</h2>
//                             <p>Your support options will be shown here.</p>
//                         </div>
//                     </div>
//                 )}

//                 {activeSection === 'refer' && (
//                     <div className='w-full'>
//                         <div className='flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full gap-4 md:gap-6'>
//                             <h2>Refer & Earn</h2>
//                             <p>Your refer and earn options will be shown here.</p>
//                         </div>
//                     </div>
//                 )}
            
//         </div>
//         </div>
//         <Footer />
//         </>
//     );
// };

// export default Profile;



import React, { useState, useCallback } from 'react';
import { FaUser, FaBoxOpen, FaHandsHelping } from 'react-icons/fa';
import { IoIosHeart, IoIosNotifications } from 'react-icons/io';
import { HiLocationMarker } from 'react-icons/hi';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { MdPayments } from 'react-icons/md';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserProfile from '../components/UserProfile';
import UpdateProfile from '../components/UpdateProfile';

const Sidebar = ({ onSelectSection, activeSection }) => {
    const menuItems = [
        { label: 'Your Profile', icon: FaUser, section: 'profile' },
        { label: 'All Notifications', icon: IoIosNotifications, section: 'notifications' },
        { label: 'Wishlist', icon: IoIosHeart, section: 'wishlist' },
        { label: 'My Orders', icon: FaBoxOpen, section: 'orders' },
        { label: 'Manage Address', icon: HiLocationMarker, section: 'address' },
        { label: 'Coupons', icon: RiDiscountPercentFill, section: 'coupons' },
        { label: 'Manage Payments', icon: MdPayments, section: 'payments' },
        { label: 'Help & Support', icon: FaHandsHelping, section: 'support' },
        { label: 'Refer & Earn', icon: null, section: 'refer' },
    ];

    return (
        <div className="flex flex-col items-center bg-white shadow-lg rounded-2xl p-4 space-y-3 md:text-lg">
            <div className="flex flex-col items-center">
                <div className="rounded-full overflow-hidden w-[75px] h-[75px] border-4 border-blue-600">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
                        alt="Profile"
                        className="object-cover w-full h-full"
                    />
                </div>
                <p className="mt-2 text-lg font-semibold text-gray-800">nameofUser</p>
            </div>
            {menuItems.map((item, index) => (
                <div
                    key={index}
                    className={`flex justify-between items-center gap-3 w-full border border-gray-200 p-3 rounded-lg transition-transform transform hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                        activeSection === item.section ? 'bg-blue-100' : ''
                    }`}
                    onClick={() => onSelectSection(item.section)}
                >
                    <div className="flex items-center gap-3">
                        {item.icon && React.createElement(item.icon, { className: 'text-blue-600 text-xl' })}
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Profile = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [isProfileView, setIsProfileView] = useState(true);

    const handleSectionChange = useCallback((section) => {
        setActiveSection(section);
    }, []);

    return (
        <>
            <Navbar />
            <div className="w-full m-8 border">
                <div className="w-full flex gap-5">
                    <Sidebar onSelectSection={handleSectionChange} activeSection={activeSection} />

                    <div className="w-custom2">
                    {activeSection === 'profile' && (
                        <>
                            {isProfileView ? (
                            <UserProfile />
                            ) : (
                            <UpdateProfile setIsProfileView={setIsProfileView} />
                            )}
                            {isProfileView && (
                            <div className="flex justify-center mt-5">
                                <button
                                onClick={() => setIsProfileView(false)}
                                className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm"
                                >
                                Update Profile
                                </button>
                            </div>
                            )}
                        </>
                        )}

                        {activeSection === 'notifications' && (
                            <div className="flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-4 md:p-6 w-full gap-4 md:gap-6">
                                <h2>Notifications</h2>
                                <p>Your notifications will be shown here.</p>
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
            </div>
            <Footer />
        </>
    );
};

export default Profile;
