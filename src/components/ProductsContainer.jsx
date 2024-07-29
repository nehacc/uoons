import React from "react";
import { CgLogIn } from "react-icons/cg";
import { FaStar } from "react-icons/fa6";

const ProductsData = [
  {
    id: 1,
    img: "//m.media-amazon.com/images/I/314Rp+8XKWL._AC_SR300,300.jpg",
    title: "Gaming Laptop",
    rating: 4.8,
    reviews: 120,
    price: "₹1500",
    offerPrice: "₹1200",
    discountPercentage: "20% off",
    aosDelay: "0",
  },
  {
    id: 2,
    img: "//m.media-amazon.com/images/I/314Rp+8XKWL._AC_SR300,300.jpg",
    title: "Smartphone",
    rating: 4.6,
    reviews: 200,
    price: "₹800",
    offerPrice: "₹650",
    discountPercentage: "18.75% off",
    aosDelay: "200",
  },
  {
    id: 3,
    img: "//m.media-amazon.com/images/I/314Rp+8XKWL._AC_SR300,300.jpg",
    title: "Wireless Head",
    rating: 4.7,
    reviews: 150,
    price: "₹200",
    offerPrice: "₹150",
    discountPercentage: "25% off",
    aosDelay: "400",
  },
  {
    id: 4,
    img: "//m.media-amazon.com/images/I/314Rp+8XKWL._AC_SR300,300.jpg",
    title: "Smartwatch",
    rating: 4.5,
    reviews: 180,
    price: "₹250",
    offerPrice: "₹200",
    discountPercentage: "20% off",
    aosDelay: "600",
  },
  {
    id: 5,
    img: "//m.media-amazon.com/images/I/314Rp+8XKWL._AC_SR300,300.jpg",
    title: "Digital Camera",
    rating: 4.4,
    reviews: 100,
    price: "₹500",
    offerPrice: "₹400",
    discountPercentage: "20% off",
    aosDelay: "800",
  },
];

const ProductsContainer = (props) => {
 let dataP = props.data;
  return (
    
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          {/* <p data-aos="fade-up" className="text-sm text-primary">
            Top Selling Products for you
          </p> */}
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            {props.heading}
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Explore our top-selling electronics with amazing discounts and offers.
          </p>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 overflow-x-auto whitespace-nowrap sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-5">
            {/* card section */}
            {dataP.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.pid}
                className="border p-4 rounded-lg shadow-lg w-[200px] space-y-2 hover:shadow-2xl"
              >
                <img
                  src={"https://uoons.com/"+data.product_images}
                  alt="image"
                  className="h-[120px] w-full object-contain rounded-md"
                />
                <div>
                  <h3 className="font-semibold text-lg h-10 overflow-hidden">{data.product_name}</h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <FaStar />
                    {/* rating */}
                    <span>4</span>
                    {/* <span className="text-gray-500">({data.reviews} Reviews)</span> */}
                    <span className="text-gray-500">(200 Reviews)</span>

                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-lg font-bold text-primary">₹{data.product_sale_price}</p>
                    <p className="line-through text-gray-500">₹{data.product_price}</p>
                  </div>
                  
                  <p className="text-green-600">{data.discount}% off</p>
                </div>
              </div>
            ))}
          </div>
          {/* view all button */}
          <div className="flex justify-center">
            <button className="text-center mt-10 cursor-pointer bg-orange-500 text-white py-1 px-5 rounded-md">
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsContainer;