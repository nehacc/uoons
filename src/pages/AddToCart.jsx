import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCreditCard, FaTag } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserSession from '../user';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const AddToCart = () => {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      if (UserSession.getSession()) {
        try {
          const response = await axios.get('/api/getMyCart', {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Accept': '*/*',
              'channel-code': 'ANDROID',
              'auth': UserSession.getAuth(),
            }
          });
  
          const cartItems = response.data.Data.items.map(item => ({
            id: item.id,
            userId: item.user_id,
            pid: item.pid,
            quantity: parseInt(item.qty),
            name: item.product_name,
            price: parseFloat(item.product_sale_price),
            originalPrice: parseFloat(item.product_price),
            images: [`https://uoons.com/${item.product_images}`],
            stock: item.product_stock,
            isInStock: item.isInStock,
            isCashOnDelivery: item.isCashOnDelivery,
            discount: item.discount,
            totalSalePrice: item.total_sale_price,
            totalOrderAmount: item.total_order_amount,
          }));
          console.log(cartItems)
          setCart(cartItems);
        } catch (error) {
          toast.error('Error fetching cart data');
          console.error('Error fetching cart data:', error);
        }

      } else {
        toast.info('Please log in to view your cart.');
      }
    };
  
    fetchCart();
  }, []);


  const navigate = useNavigate();

const handleBuyNow = () => {
  // Get all product IDs from the cart
  const productIds = cart.map(item => item.pid);

  // Convert the array of product IDs into a comma-separated string
  const pidsString = productIds.join(',');

  // Navigate to the Checkout page with the formatted p_id string
  navigate(`/Checkout/${pidsString}`);
};


  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const applyCoupon = () => {
    if (coupon === 'SAVE10') {
      setDiscount(0.1); // 10% discount
    } else {
      setDiscount(0);
    }
  };

  const incrementQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
  };

  const decrementQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
    }
  };

  const discountedTotal = getTotalPrice() * (1 - discount);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="flex flex-col items-center bg-blue-100 py-8">
        <div className="w-[95%] relative">
            <div className="flex flex-col gap-3 lg:flex-row w-full p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-bold mb-4">Shopping Bag</h2>
                <p className="text-lg mb-6">{cart.length} items in your bag.</p>
                <div className="border-b pb-4 mb-4">
                  {cart.map((product, index) => (
                    <div key={product.id} className="flex gap-5 items-center mb-4">
                      <div className="">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-[200px] h-[250px] object-scale-down rounded-lg"
                        />
                      </div>
                      <div className='flex flex-col'>
                        <div className="">
                          <h3 className="font-bold text-lg">{product.name}</h3>
                          <p className="text-gray-600">Stock: {product.stock}</p>
                        </div>
                        <div className="flex items-center justify-between w-2/3">
                          <span className="text-lg mr-8">₹{product.price}</span>
                          <div className="flex items-center border px-2 rounded-lg">
                            <button
                              onClick={() => decrementQuantity(index)}
                              className="px-2 text-gray-600 hover:text-gray-800"
                            >
                              -
                            </button>
                            <span className="px-4">{product.quantity}</span>
                            <button
                              onClick={() => incrementQuantity(index)}
                              className="px-2 text-gray-600 hover:text-gray-800"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-lg ml-8">Total: ₹{product.price * product.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col lg:w-1/3 bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold mb-4">Cart Summary</h3>
                <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Cart Subtotal</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between mb-2">
                      <span>Discount</span>
                      <span>-₹{(getTotalPrice() * discount).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg">
                    <span>Cart Total</span>
                    <span>₹{discountedTotal.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <FaTag className="text-green-600" />
                  <input
                    type="text"
                    placeholder="Apply coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-grow border border-gray-300 rounded-l-lg py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-green-600 text-white font-semibold py-2 px-4 rounded-r-lg transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Apply
                  </button>
                </div>
                <button onClick={handleBuyNow} className="mt-6 flex mx-auto items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-md shadow-md text-lg">
                  <FaCreditCard className="mr-2" /> Buy All
                </button>
              </div>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddToCart;
