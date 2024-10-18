import React, { useState, useEffect } from 'react';

const DiscountFilter = ({ onDiscountChange }) => {
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);

  const discountOptions = [
    { label: 'Above 10%', value: 10 },
    { label: 'Above 20%', value: 20 },
    { label: 'Above 30%', value: 30 },
    { label: '51% - 80%', value: 50 },
  ];

  const handleCheckboxChange = (value) => {
    const newSelectedDiscounts = selectedDiscounts.includes(value)
      ? selectedDiscounts.filter((discount) => discount !== value)
      : [...selectedDiscounts, value];
    setSelectedDiscounts(newSelectedDiscounts);
  };

  useEffect(() => {
    if (onDiscountChange) {
      onDiscountChange(selectedDiscounts);
    }
  }, [selectedDiscounts, onDiscountChange]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-full">
      <h2 className="text-lg font-semibold mb-4">Discount</h2>
      <div>
        {discountOptions.map((option) => (
          <label key={option.value} className="flex items-center mb-2">
            <input
              type="checkbox"
              value={option.value}
              checked={selectedDiscounts.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
              className="mr-2"
            />
            <span className="flex justify-between w-full">
              {option.label} 
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DiscountFilter;
