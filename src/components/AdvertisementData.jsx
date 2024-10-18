import React from "react";

const AdContainer = ({ advertisementData }) => {
  return (
    <div className="mt-14 mb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Check out our latest sponsored advertisements.
          </h1>
        </div>
        {/* Body section */}
        <div>
          <div className="flex justify-center gap-8">
            {/* ad images */}
            {advertisementData.items.map((ad) => (
              <div
                key={ad.id}
                className="w-fit relative flex flex-col justify-center items-center rounded-lg transition duration-300 shadow-md"
              >
                <img
                  src={"https://uoons.com/" + ad.image}
                  alt={ad.title}
                  className="h-full object-contain rounded-lg"
                />
                
                  <p className="text-sm text-white absolute top-0 right-3">
                    Sponsored
                  </p>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdContainer;
