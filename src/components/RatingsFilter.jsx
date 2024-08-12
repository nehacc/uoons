import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const RatingFilter = () => {
  const [selectedRatings, setSelectedRatings] = useState([]);

  const ratings = [5, 4, 3, 2, 1];

  const handleCheckboxChange = (rating) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement filtering logic here based on selectedRatings
    console.log('Filtering products with ratings:', selectedRatings);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-full">
      <h2 className="text-lg font-semibold mb-4">Filter by Rating</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        {ratings.map((rating) => (
          <label key={rating} className="flex items-center mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedRatings.includes(rating)}
              onChange={() => handleCheckboxChange(rating)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2 flex items-center text-gray-700">
              {[...Array(rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
              {[...Array(5 - rating)].map((_, i) => (
                <FaStar key={i} className="text-gray-300" />
              ))}
            </span>
          </label>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition duration-300 mt-4"
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default RatingFilter;
