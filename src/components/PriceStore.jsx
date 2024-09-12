import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from 'react-router-dom';

const PriceStore = ({priceStoreData}) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const handlePriceRangeClick = (maxPrice) => {
    navigate(`/ProductListPriceStore/${2}`); //somewhere
  };

  return (
    <div className="mt-7 mb-12">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold text-orange-600">Price Store</h1>
        <p className="text-xs text-gray-400 mb-6">Find the best deals within your budget.</p>
        
        <div className="flex justify-center gap-6 flex-wrap">
          {[1,2,3,4].map((item) => (
            <div
              key={item.id}
              onClick={() => handlePriceRangeClick()}

              className="cursor-pointer border rounded-lg shadow-lg w-[350px] hover:shadow-2xl flex flex-col items-center relative overflow-hidden bg-blue-100"
              data-aos="fade-up"
            >
              <img src="/sampleUnder.jpg" alt="priceStoreImage" />

              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceStore;
