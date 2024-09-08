import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from 'react-router-dom';
// import '../components/PriceStore.css'; // Optional for additional custom styling if needed.

const PriceStore = ({ priceStoreData }) => {
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
    navigate(`/price-range/${maxPrice}`);
  };

  return (
    <div className="mt-7 mb-12">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold text-orange-600">{priceStoreData.name}</h1>
        <p className="text-xs text-gray-400 mb-6">Find the best deals within your budget.</p>
        
        <div className="flex justify-center gap-6 flex-wrap">
          {priceStoreData.items.map((item) => (
            <div
              key={item.id}
              onClick={() => handlePriceRangeClick(item.under)}
              className="cursor-pointer border p-6 rounded-lg shadow-lg w-[300px] hover:shadow-2xl flex flex-col items-center relative overflow-hidden bg-blue-100"
              data-aos="fade-up"
            >
              <img src="/sampleUnder.jpg" alt="" />
              <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600">Explore products under Rs. {item.under}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceStore;
