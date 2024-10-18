import React, { useEffect, useState } from "react";
import UserSession from "../user";
import axios from "axios";
import { FaCreditCard, FaShoppingCart, FaTags } from "react-icons/fa";

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

      {/* Summary and Action Buttons */}
      <div className="border-t-2 mt-6 pt-6 flex flex-col items-center">
        <p className="text-lg font-semibold text-gray-700">
          Total: <span className="font-bold text-green-600">₹{totalSalePrice}</span>
        </p>
        <p className="text-lg text-orange-500 font-bold mt-1">
          Buy all together and save ₹1000!
        </p>
        <p className="text-2xl text-green-600 font-bold">
          Final Price: ₹{totalSalePrice - 1000}
        </p>

        <div className="flex space-x-4 mt-6">
          <button
            onClick={addAllToCart}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded shadow-lg hover:shadow-2xl flex items-center space-x-2 transition-all duration-300"
          >
            <FaCartPlus />
            <span>Add All to Cart</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Buy All Together
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyBought;
