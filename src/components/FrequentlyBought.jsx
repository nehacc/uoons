import React from 'react';
import { FaShoppingCart, FaCreditCard, FaTags } from 'react-icons/fa';

const frequentlyBoughtTogether = [
  {
    name: "USB Optical Mouse, USB 2.0 - Black",
    image: "https://m.media-amazon.com/images/I/51nifWngl-L._SX679_.jpg",
    price: 149
  },
  {
    name: "Gaming Chair from Rekart, RGC-08 PU + PVC Black Frame",
    image: "https://m.media-amazon.com/images/I/51nifWngl-L._SX679_.jpg",
    price: 9985
  },
  {
    name: "HP 15-DA3001TU Laptop",
    image: "https://m.media-amazon.com/images/I/51nifWngl-L._SX679_.jpg",
    price: 35499
  }
];

const FrequentlyBought = () => {
  const totalPrice = frequentlyBoughtTogether.reduce((total, item) => total + item.price, 0);
  const discount = 1000; // Discount offer
  const discountedPrice = totalPrice - discount;

  return (
    <div className='bg-white p-8 rounded-lg shadow-lg w-full my-8 mx-auto'>
      <h2 className='font-bold text-3xl mb-8 text-center text-gray-800'>Frequently Bought Together</h2>
      <div className='flex flex-col lg:flex-row items-center justify-center gap-8'>
        {frequentlyBoughtTogether.map((item, index) => (
          <React.Fragment key={index}>
            <div className='flex flex-col items-center text-center p-6 mx-2 bg-gray-50 rounded-md shadow-sm w-60'>
              <img 
                src={item.image} 
                alt={item.name}
                className='w-32 h-32 object-cover mb-4 rounded-md'
              />
              <h3 className='font-bold text-lg h-[84px] overflow-hidden'>{item.name}</h3>
              {item.description && <p className='text-sm text-gray-500'>{item.description}</p>}
              <p className='text-green-700 font-bold text-xl mt-2'>Rs. {item.price}</p>
            </div>
            {index < frequentlyBoughtTogether.length - 1 && <span className='text-3xl font-bold mx-4 text-gray-600'>+</span>}
          </React.Fragment>
        ))}
      </div>
      <div className='flex flex-col items-center justify-between mt-8'>
        <h3 className='font-bold text-2xl mb-4 text-gray-800'>Special Offer:</h3>
        <div className='bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 w-full max-w-lg'>
          <p className='font-bold text-lg flex items-center'><FaTags className='mr-2' /> Buy all three and save Rs. 1000!</p>
        </div>
        <h3 className='font-bold text-2xl mb-2 text-gray-800'>Price for all three:</h3>
        <span className='font-bold text-2xl text-gray-500 mb-4 line-through'>Rs. {totalPrice}</span>
        <span className='font-bold text-3xl text-green-700 mb-6'>Rs. {discountedPrice}</span>
        <div className='flex items-center gap-6'>
          <button className='bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-md flex items-center gap-2'>
            <FaShoppingCart /> Add all three to cart
          </button>
          <button className='bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md flex items-center gap-2'>
            <FaCreditCard /> Buy all together
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyBought;
