import React, { useState, useEffect } from 'react';
import { Range, getTrackBackground } from 'react-range';

const PriceFilter = ({ onPriceChange }) => {
  const [values, setValues] = useState([100, 100000]);
  const MIN = 0;
  const MAX = 100000;

  // Call the callback whenever the values change
  useEffect(() => {
    if (onPriceChange) {
      onPriceChange(values);
    }
    console.log(`Filtering products between ₹${values[0]} and ₹${values[1]}`);
  }, [values, onPriceChange]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-full">
      <h2 className="text-lg font-semibold mb-4">Price Range</h2>
      <div className="flex justify-between text-gray-700 mb-2">
        <span>₹{values[0]}</span>
        <span>₹{values[1]}</span>
      </div>
      <Range
        values={values}
        step={10}
        min={MIN}
        max={MAX}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              background: getTrackBackground({
                values,
                colors: ['#ccc', '#007bff', '#ccc'],
                min: MIN,
                max: MAX,
              }),
              borderRadius: '4px',
            }}
            className="mb-4"
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '20px',
              width: '20px',
              borderRadius: '50%',
              backgroundColor: '#007bff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div style={{ height: '10px', width: '2px', backgroundColor: '#fff' }} />
          </div>
        )}
      />
    </div>
  );
};

export default PriceFilter;
