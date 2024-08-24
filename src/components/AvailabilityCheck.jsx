import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaCheckCircle, FaDollarSign, FaTruck, FaBoxOpen } from 'react-icons/fa';

const AvailabilityChecker = ({ p_id }) => {
    const [pincode, setPincode] = useState('');
    const [availability, setAvailability] = useState(null);

    const handleCheckAvailability = async () => {
        try {
            const response = await axios.get(`/api/productLocationAvailability?pincode=${pincode}&pid=${p_id}`, {
                headers: {
                    'Channel-Code': 'ANDROID'
                }
            });
            console.log('API Response:', response.data); // Log the entire response to check its structure
            
            // Access the nested Data property
            setAvailability(response.data.Data);
        } catch (error) {
            console.error('Error fetching availability:', error);
        }
    };

    useEffect(() => {
        if (availability) {
            console.log('Updated Availability:', availability.isServiceable); // Should print true or false correctly
        }
    }, [availability]);

    return (
        <div className="mt-1 p-6 bg-white shadow-lg rounded-lg w-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Check Availability</h2>
            <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-600" />
                <input
                    type="text"
                    placeholder="Enter pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="border border-gray-300 rounded-l-lg py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105 outline-0"
                />
                <button
                    onClick={handleCheckAvailability}
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-r-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Check
                </button>
            </div>
            {availability && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Availability Details</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                            {console.log('Rendering isServiceable:', availability.isServiceable)}
                            <FaCheckCircle className={availability.isServiceable ? 'text-green-600' : 'text-red-600'} />
                            <span>{availability.isServiceable ? 'Serviceable' : 'Not Serviceable'}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaDollarSign className="text-gray-600" />
                            <span>Shipping Charge: {availability.shippingCharge}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaTruck className="text-gray-600" />
                            <span>Expected Delivery: {availability.expDeliveryTime}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaBoxOpen className="text-gray-600" />
                            <span>Stock Status: {availability.stock_availability}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaCheckCircle className={availability.isCOD ? 'text-green-600' : 'text-red-600'} />
                            <span>{availability.isCOD ? 'COD Available' : 'COD Not Available'}</span>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AvailabilityChecker;
