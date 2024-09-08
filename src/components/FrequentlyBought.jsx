import React from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserSession from '../user';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const FrequentlyBoughtTogether = ({ freq_prod }) => {

  const navigate = useNavigate();

  const totalSalePrice = freq_prod.reduce(
    (acc, product) => acc + parseFloat(product.product_sale_price),
    0
  );

  // Function to add individual products to cart
  const addToCart = async (pid) => {
    if (UserSession.getSession()) {
      try {
        const response = await axios.post('/api/addItemToCart', {
          pid: pid,
          qty: 1
        }, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            'Accept': '*/*',
            'Channel-Code': 'ANDROID',
            'auth': UserSession.getAuth(),
          }
        });

        if (response.data.status === 'success') {
          toast.success("Product added to Cart");
        }
      } catch (err) {
        toast.error("An error occurred while adding the item to the cart");
      }
    } else {
      toast.info("Please log in to add items to your cart.");
    }
  };
  // Add all products to cart
  const addAllToCart = () => {
    freq_prod.forEach(product => {
      addToCart(product.pid);
    });
  };


  const handleBuyNow = () => {
      const productIds = freq_prod.map(item => item.pid);
      const pidsString = productIds.join(',');
  
      navigate(`/Checkout/${pidsString}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto mt-10">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">Frequently Bought Together</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {freq_prod.map((product) => (
          <div key={product.pid} 
          // onClick={() => { navigate(`/PdTest/${product.pid}`) }}
          
          className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
            <img
              src={"https://uoons.com/"+product.product_images}
              alt={product.product_name}
              className="w-full h-64 object-contain rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{product.product_name}</h3>
            {/* <p className="text-gray-500 text-sm mt-1">
              {product.product_description.replace(/<\/?[^>]+(>|$)/g, '')}
            </p> */}
            <div className="mt-4">
              <span className="text-2xl font-bold text-green-600">₹{product.product_sale_price}</span>
              {product.discount && (
                <span className="text-sm text-gray-500 line-through ml-2">₹{product.product_price}</span>
              )}
            </div>
            <div className="text-sm text-blue-600 mt-1">{product.discount}% Off</div>
          </div>
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

export default FrequentlyBoughtTogether;
