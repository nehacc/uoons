import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaCreditCard, FaTags } from 'react-icons/fa';
import axios from 'axios';
import UserSession from "../user";

const FrequentlyBought = ({ pids }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async (pid) => {
      try {
        const response = await axios.get(`/api/productDetail?pid=${pid}`, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            'Accept': '*/*',
            'channel-code': 'ANDROID',
            'auth': UserSession.getAuth(),
          },
        });
        return response.data.Data; // Assuming the product data is within `Data`
      } catch (err) {
        setError(err);
        return null;
      }
    };

    const loadProducts = async () => {
      setLoading(true);
      const fetchedProducts = await Promise.all(pids.map(pid => fetchProductData(pid)));
      setProducts(fetchedProducts.filter(product => product !== null));
      setLoading(false);
    };

    loadProducts();
  }, [pids]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  const totalPrice = products.reduce((total, item) => total + item.product_sale_price, 0);
  const discount = 1000; // Discount offer
  const discountedPrice = totalPrice - discount;

  return (
    <div className='bg-white p-8 rounded-lg shadow-lg w-full my-8 mx-auto'>
      <h2 className='font-bold text-3xl mb-8 text-center text-gray-800'>Frequently Bought Together</h2>
      <div className='flex flex-col lg:flex-row items-center justify-center gap-8'>
        {products.map((item, index) => (
          <React.Fragment key={item.pid}>
            <div className='flex flex-col items-center text-center p-6 mx-2 bg-gray-50 rounded-md shadow-sm w-60'>
              <img 
                src={"https://uoons.com/" + item.product_images[0]} 
                alt={item.product_name}
                className='w-32 h-32 object-cover mb-4 rounded-md'
              />
              <h3 className='font-bold text-lg h-[84px] overflow-hidden'>{item.product_name}</h3>
              {item.description && <p className='text-sm text-gray-500'>{item.description}</p>}
              <p className='text-green-700 font-bold text-xl mt-2'>Rs. {item.product_sale_price}</p>
            </div>
            {index < products.length - 1 && <span className='text-3xl font-bold mx-4 text-gray-600'>+</span>}
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
