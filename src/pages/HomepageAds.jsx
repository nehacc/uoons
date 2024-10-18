import React, { useEffect } from 'react';
import NavbarAds from '../components/NavbarAds';
import FooterAds from '../components/FooterAds';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Icon } from '@iconify/react';

const HomepageAds = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <>
      <NavbarAds />
      <div className='w-full relative bg-white'>
      
      {/* Poster Section */}
      <div
        className="text-white w-full flex flex-col md:flex-row justify-center items-center p-8 px-10 bg-gradient-to-b from-[#161211] via-[#2c2827] to-[#161211]"
        data-aos="fade-in"
      >
        {/* Text Section */}
        <div className="md:basis-1/2 space-y-8 p-4 " data-aos="fade-left">
          <h1 className="text-4xl md:text-5xl w-fit">
            <span>&lt;</span> Expand your reach with <span>&gt;</span> <br />
            <span className="font-bold">targeted</span> advertising
          </h1>
          <p className="text-lg">
            Attract potential buyers with customized ads. Sponsored campaigns expand
            your business reach, leading to more visitors and sales.
          </p>
        </div>

        {/* Image Section */}
        <div className="" data-aos="fade-right">
          <img
            src="corporate-professional-women-removebg-preview.png"
            alt="Professional women collaborating in a corporate environment"
            className="w-[90%] max-w-[336px] lg:w-[336px] md:ml-5 lg:ml-32"
            loading="lazy"
          />
        </div>
      </div>


     {/* Target Section */}
      <div
        className="flex flex-col md:flex-row gap-6 justify-center items-center px-4 md:px-14 lg:px-20 my-7"
        data-aos="zoom-in"
      >
        <Icon
          icon="mdi:target-arrow"
          className="text-blue-600 text-[200px]"
          aria-hidden="true"
        />
        <p className=" text-3xl text-center md:text-left text-gray-600">
          <span className="text-orange-600 font-extrabold">
            Make a big impact
          </span>{" "}
          by connecting with customers at every point of their shopping journey
        </p>
      </div>

      {/* img */}
      <div className='w-full mx-auto max-w-[1024px] mb-14 mt-12'>
        <img src="/bodyAds.png" alt="Various ad campaign visual representations" className='w-full' data-aos="fade-in" loading="lazy"/>
      </div>

      <div className="p-8 bg-blue-100 flex items-center justify-center" data-aos="fade-up">
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Promote Products */}
        <div
          className="bg-white rounded-xl shadow-lg p-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          data-aos="fade-up"
        >
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Promote Products</h2>
          <p className="text-gray-600 mb-6">Increase the prominence of individual products.</p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Icon
                icon="icon-park-solid:correct"
                className="text-blue-500 mr-3 text-xl"
                aria-hidden="true"
              />
              <span className="text-gray-700">Manage spend with cost-per-click.</span>
            </li>
            <li className="flex items-start">
              <Icon
                icon="icon-park-solid:correct"
                className="text-blue-500 mr-3 text-xl"
                aria-hidden="true"
              />
              <span className="text-gray-700">Feature prominently in search results and product pages.</span>
            </li>
          </ul>
        </div>
        
        {/* Card 2: Promote Stores */}
        <div
          className="bg-white rounded-xl shadow-lg p-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h2 className="text-2xl font-bold text-purple-500 mb-4">Promote Stores</h2>
          <p className="text-gray-600 mb-6">Showcase your entire product range to potential buyers.</p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Icon
                icon="icon-park-solid:correct"
                className="text-blue-500 mr-3 text-xl"
                aria-hidden="true"
              />
              <span className="text-gray-700">Provide an engaging, multi-page shopping journey.</span>
            </li>
            <li className="flex items-start">
              <Icon
                icon="icon-park-solid:correct"
                className="text-blue-500 mr-3 text-xl"
                aria-hidden="true"
              />
              <span className="text-gray-700">Control your branded storefront experience.</span>
            </li>
          </ul>
        </div>
        
        {/* Card 3: Promote Brands */}
        <div
          className="bg-white rounded-xl shadow-lg p-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Promote Brands</h2>
          <p className="text-gray-600 mb-6">Increase brand visibility and awareness effectively.</p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Icon
                icon="icon-park-solid:correct"
                className="text-blue-500 mr-3 text-xl"
                aria-hidden="true"
              />
              <span className="text-gray-700">Feature prominently in shopping results and multiple pages.</span>
            </li>
            <li className="flex items-start">
              <Icon
                icon="icon-park-solid:correct"
                className="text-blue-500 mr-3 text-xl"
                aria-hidden="true"
              />
              <span className="text-gray-700">
                Highlight with personalized headlines, videos, and images.
              </span>
            </li>
          </ul>
        </div>
        
      </div>
    </div>


      {/* Ad Solutions Section */}
      <div
        className="flex flex-col items-center py-12 px-4  sm:px-6 lg:px-8 bg-white text-center"
        data-aos="fade-in"
      >
        <h2
          className="text-3xl font-bold text-gray-800 mb-4"
          data-aos="bounce-in-down"
        >
          Effective ad solutions for all budget sizes
          <div
          className="w-3/4 mx-auto mt-5 rounded-full h-[0.35rem] bg-blue-400 mb-4"
          data-aos="slide-in-left"
        ></div>
        </h2>
        
        <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0 md:space-x-8 px-10">
          
          {/* Card 1: No initial costs */}
          <div
            className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg max-w-[500px]"
            data-aos="fade-in-left"
          >
            <Icon
              icon="mdi:hand-coin-outline"
              className="text-orange-500 text-6xl mb-4"
              aria-hidden="true"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              No initial costs
            </h3>
            <p className="text-gray-600">
              Opt for our cost-per-click pricing model, where you'll only be charged
              based on the actual clicks by shoppers.
            </p>
          </div>

          {/* Card 2: Budget friendly */}
          <div
            className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg w-[500px]"
            data-aos="fade-in-right"
          >
            <Icon
              icon="mdi:cash-multiple"
              className="text-green-500 text-6xl mb-4"
              aria-hidden="true"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Budget friendly
            </h3>
            <p className="text-gray-600">
              Rest assured, your expenses will never exceed your allotted budget. We
              prioritize your choice.
            </p>
          </div>
          
        </div>
      </div>


     {/* Startup India Section */}
      <div
        className="flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-amber-200 via-amber-200 to-red-400"
        data-aos="fade-up"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-9 mb-4">
          <img
              src="/pngwing.com (1).png"
              alt="Make in India logo"
              className="w-56 h-auto"
              loading="lazy"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/en/4/46/Make_In_India.png"
              alt="Make in India logo"
              className="w-32 h-auto"
              loading="lazy"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Specialized Support for Startups</h2>
          <p className="text-gray-600">
            We offer specialized support to startups recognized by the Department for Promotion of Industry and Internal Trade (DPIIT).
          </p>
        </div>
      </div>


      {/* Call to Action Section */}
      <div
        className="bg-black text-white flex flex-col items-center justify-center p-8"
        data-aos="fade-in"
      >
        <p
          className="text-xl md:text-2xl text-center mb-8"
          data-aos="fade-in-down"
        >
          Utilize targeted keywords to appear in relevant shopping results, engaging potential customers who are new to your brand.
        </p>
        <button
          className="bg-white text-black text-lg font-semibold py-2 px-8 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          data-aos="fade-in-up"
          aria-label="Start now with targeted advertising"
        >
          Start Now
        </button>
      </div>

      <FooterAds />
    </div>
    </>
  );
};

export default HomepageAds;
