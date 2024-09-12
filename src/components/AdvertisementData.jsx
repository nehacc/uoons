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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* ad images */}
            {advertisementData.items.map((ad) => (
              <div
                key={ad.id}
                className="relative flex flex-col justify-center items-center rounded-lg transition duration-300 shadow-md"
              >
                <img
                  src={"https://uoons.com/" + ad.image}
                  alt={ad.title}
                  className="h-auto w-full object-contain rounded-lg"
                />
                
                  <p className="text-sm text-white absolute bottom-0 left-2">
                    Sponsored by: {ad.sponsored_by}
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
