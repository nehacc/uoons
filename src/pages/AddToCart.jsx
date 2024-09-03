import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCreditCard, FaTag } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserSession from '../user';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const AddToCart = () => {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

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
        console.log(cartItems);
        setCart(cartItems);
      } catch (error) {
        toast.error('Error fetching cart data');
        console.error('Error fetching cart data:', error);
      }
    } else {
      toast.info('Please log in to view your cart.');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const navigate = useNavigate();

  const handleBuyNow = () => {
    const productIds = cart.map(item => item.pid);
    const pidsString = productIds.join(',');

    navigate(`/Checkout/${pidsString}`);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const applyCoupon = () => {
    if (coupon === 'SAVE10') {
      setDiscount(0.1); // 10% discount
      toast.success('Coupon applied! 10% discount added.');
    } else {
      setDiscount(0);
      toast.error('Invalid coupon code.');
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

  const handleRemoveItem = async (productId) => {
    if (!UserSession.getSession()) {
      toast.info('Please log in to modify your cart.');
      return;
    }

    try {
      const response = await axios.post('/api/removeCart', {
        pid: productId,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'channel-code': 'ANDROID',
          'auth': UserSession.getAuth(),
        }
      });

      if (response.data.status === "success") {
        toast.success('Item removed from cart.');
        fetchCart();
      } else {
        toast.error('Failed to remove item.');
      }
    } catch (error) {
      toast.error('Error removing item from cart.');
      console.error('Error removing item:', error);
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
            <div className="bg-white rounded-lg shadow-lg p-6 w-full lg:w-2/3">
              <h2 className="text-3xl font-bold mb-4">Shopping Bag</h2>
              <p className="text-lg mb-6">{cart.length} items in your bag.</p>
              <div className="border-b pb-4 mb-4">
                {cart.length > 0 ? (
                  cart.map((product, index) => (
                    <div key={product.id} className="flex gap-5 items-center mb-4">
                      <div className="">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-[200px] h-[250px] object-scale-down rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="">
                          <h3 className="font-bold text-lg">{product.name}</h3>
                          <p className="text-gray-600">Stock: {product.stock}</p>
                        </div>
                        <div className="flex items-center justify-around w-full">
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
                        <div className="flex items-center justify-end w-full">
                          <button
                            onClick={() => handleRemoveItem(product.pid)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </div>
            </div>
            <div className="flex flex-col lg:w-1/3 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Cart Summary</h3>
              <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                <div className="flex justify-between mb-2">
                  <span>Cart Subtotal</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
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
              
              {/* apply coupon */}
              <div className="mt-1 flex items-center gap-2">
                  <FaTag className="text-green-600" />
                  <input
                      type="text"
                      onClick={applyCoupon}
                      placeholder="Apply coupon code"
                      className="border border-gray-300 rounded-l-lg py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105 outline-0"
                  />
                  <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded-r-lg transition duration-300 ease-in-out transform hover:scale-105">Apply</button>
              </div>
              <button
                onClick={handleBuyNow}
                className={`mt-6 flex mx-auto items-center px-6 py-3 ${cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'} text-white font-bold rounded-md shadow-md text-lg`}
                disabled={cart.length === 0} // Disable button if cart is empty
              >
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
