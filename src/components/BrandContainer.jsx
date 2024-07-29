import React from "react";

const BrandsData = [
  { id: 1, img: "https://event.realme.com/static/img/ic_notification@2x.0c5bbf2.png" },
  { id: 2, img: "https://event.realme.com/static/img/ic_notification@2x.0c5bbf2.png" },
  { id: 3, img: "https://event.realme.com/static/img/ic_notification@2x.0c5bbf2.png" },
  { id: 4, img: "https://event.realme.com/static/img/ic_notification@2x.0c5bbf2.png" },
  { id: 5, img: "https://event.realme.com/static/img/ic_notification@2x.0c5bbf2.png" },
  { id: 6, img: "https://event.realme.com/static/img/ic_notification@2x.0c5bbf2.png" },
  { id: 7, img: "https://event.realme.com/static/img/ic_notification@2x.0c5bbf2.png" },
  { id: 8, img: "https://event.realme.com/static/img/ic_notification@2x.0c5bbf2.png" },
];

const BrandContainer = () => {
  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Discover the top electronic brands we have in store for you.
          </h1>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 place-items-center">
            {/* brand logos */}
            {BrandsData.map((brand) => (
              <div
                key={brand.id}
                className="flex justify-center items-center w-full h-[250px] p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-300"
              >
                <img
                  src={brand.img}
                  alt={`Brand ${brand.id}`}
                  className="max-h-full max-w-full object-contain"
                />
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

export default BrandContainer;
