import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaThumbsUp } from 'react-icons/fa';

const RatingsReviews = () => {
  const reviews = [
    {
      name: 'Tukun Puhan',
      date: '10 Jun 24',
      rating: 5,
      text: 'I was using this phone for more than 7 months and it\'s working so smoothly and has a great camera. Overall it\'s a great phone, great choice',
      likes: 7,
    },
    {
      name: 'Mininath Mandlik',
      date: '22 Oct 23',
      rating: 4,
      text: 'Good phone for this price, camera average, ram very fast, camera image quality very nice, all is ok, buy now',
      likes: 150,
    },
    {
      name: 'Xabeez Gupta',
      date: '11 Sep 23',
      rating: 5,
      text: 'Best phone for camera. Please buy',
      likes: 206,
    },
    {
      name: '--',
      date: '20 Aug 23',
      rating: 2,
      text: 'Hanging issue. Not buy',
      likes: 240,
    },
  ];

  const starsArray = [1, 2, 3, 4, 5];

  return (
    <div className='bg-white flex gap-5 items-start rounded-[16px] p-6 my-8 shadow-lg relative w-[95%] mx-auto'>
      <div className="w-1/2 p-4 border rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Reviews from Customers</h2>
        <div className="flex flex-col gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                {Array(Math.floor(review.rating)).fill(<FaStar className="text-yellow-500 text-xl" />)}
                {review.rating % 1 !== 0 && <FaStarHalfAlt className="text-yellow-500 text-xl" />}
                {Array(5 - Math.ceil(review.rating)).fill(<FaRegStar className="text-yellow-500 text-xl" />)}
              </div>
              <p className="font-bold">{review.text}</p>
              <div className="text-sm text-gray-600 flex items-center justify-between">
                <span>{review.name} posted on {review.date}</span>
                <div className="flex items-center">
                  <FaThumbsUp className="mr-1" /> {review.likes}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 p-4 border rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Ratings & Reviews</h2>
        <div className="text-xl mb-2">
          <span className="text-4xl font-bold text-yellow-500">4.7</span>
          <span className="text-lg text-gray-600 ml-2">Based on 1234 Ratings</span>
        </div>
        <div className="flex mb-4">
          {starsArray.map((_, index) => (
            <FaStar key={index} className="text-yellow-500 text-xl" />
          ))}
        </div>
        <div className="mb-6">
          {[[789, '5 Stars'], [321, '4 Stars'], [56, '3 Stars'], [34, '2 Stars'], [34, '1 Star']].map(([count, label], index) => (
            <div key={index} className="flex justify-between mb-1">
              <span className="font-bold">{count}</span>
              <span className="text-gray-600">{label}</span>
            </div>
          ))}
        </div>
        <div className="mb-6">
          {[
            { name: 'John Doe', date: '10 Jun, 2024', rating: 4.5, text: 'Great phone with excellent battery life.' },
            { name: 'Jane Smith', date: '8 Jun, 2024', rating: 4.5, text: 'Loving the camera quality and the display.' }
          ].map((review, index) => (
            <div key={index} className="mb-6">
              <span className="font-bold">{review.name}</span>
              <span className="text-sm text-gray-600 ml-2">{review.date}</span>
              <div className="flex my-2">
                {Array(Math.floor(review.rating)).fill(<FaStar className="text-yellow-500 text-xl" />)}
                {review.rating % 1 !== 0 && <FaStarHalfAlt className="text-yellow-500 text-xl" />}
              </div>
              <p className="text-lg">{review.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Rate this product</h3>
          <div className="flex items-center gap-2 mb-4">
            {Array(5).fill(<FaRegStar className="text-yellow-500 text-xl cursor-pointer hover:text-yellow-600" />)}
          </div>
          <textarea className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" rows="4" placeholder="Write your review here..."></textarea>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md mt-4">Submit Review</button>
        </div>
      </div>
    </div>
  );
};

export default RatingsReviews;
