import React from "react";

const AdvertisementData = {
  name: "Advertisement",
  id: 7,
  items: [
    {
      id: "1",
      brand_id: "2",
      title: "Advertisement 1",
      image: "assets/slider/ab10dca1ed771da5121c08e65abdf5ca.png",
      sponsored_by: "Kayroo",
      tags: "music, headphone",
      created_at: "2022-02-14 06:24:30",
    },
    {
      id: "2",
      brand_id: "4",
      title: "Advertisement 2",
      image: "assets/slider/863f739c221c80ac626bbcec7aebe7f9.png",
      sponsored_by: "Hammer",
      tags: "smartwatch",
      created_at: "2022-02-14 06:24:33",
    },
  ],
};

const AdContainer = () => {
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
            {AdvertisementData.items.map((ad) => (
              <div
                key={ad.id}
                className="flex flex-col justify-center items-center w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-300 shadow-md"
              >
                <img
                  src={"https://uoons.com/" + ad.image}
                  alt={ad.title}
                  className="h-auto w-full object-cover rounded-lg"
                />
                <div className="text-center mt-4">
                  <h3 className="text-xl font-semibold">{ad.title}</h3>
                  <p className="text-sm text-gray-600">Sponsored by: {ad.sponsored_by}</p>
                </div>
              </div>
            ))}
          </div>
          {/* view more button */}
          <div className="flex justify-center">
            <button className="text-center mt-10 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-md shadow-lg transition duration-300">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdContainer;
