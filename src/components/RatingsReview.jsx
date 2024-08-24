import React, { useState } from 'react';
import Rating from 'react-rating';
import { FaStar, FaStarHalfAlt, FaRegStar, FaThumbsUp } from 'react-icons/fa';
import UserSession from '../user';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const RatingsReviews = ({ pid, rating = { total: 0, rating: 0 }, reviews = [] }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    if (selectedRating === 0) {
      alert('Please select a rating.');
      return;
    }

    const formData = new FormData();
    formData.append('product_id', pid);
    formData.append('product_rating', selectedRating);
    formData.append('product_review', data.product_review);
    
    if (data.product_image && data.product_image.length > 0) {
      formData.append('product_image', data.product_image[0]);
    }

    try {
      const response = await axios.post('/api/addOrderReviewRating', formData, {
        headers: {
          "channel-code": "ANDROID",
          "auth": UserSession.getAuth(),
        },
      });
      console.log('Response:', response.data);
      alert('Review submitted successfully!');
      reset(); // Reset the form after submission
      setSelectedRating(0); // Reset the star rating
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting your review. Please try again.');
    }
  };

  return (
    <div className="bg-white flex flex-col lg:flex-row gap-5 items-start rounded-[16px] p-6 my-8 shadow-lg relative w-[95%] mx-auto">
      <div className="lg:w-1/2 w-full p-4 border rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Ratings & Reviews</h2>
        <div className="text-xl mb-2">
          <span className="text-4xl font-bold text-yellow-400">{rating.rating.toFixed(1)}</span>
          <span className="text-lg text-gray-600 ml-2">Based on {rating.total} Ratings</span>
        </div>
        <div className="flex mb-4">
          <Rating
            initialRating={rating.rating}
            readonly
            fullSymbol={<FaStar className="text-yellow-400 text-xl" />}
            emptySymbol={<FaRegStar className="text-gray-300 text-xl" />}
          />
        </div>
        <div className="mt-6 w-full">
          <h3 className="text-xl font-bold mb-4">Rate this product</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Rating
                initialRating={selectedRating}
                onChange={rate => setSelectedRating(rate)}
                fullSymbol={<FaStar className="text-yellow-400 text-xl" />}
                emptySymbol={<FaRegStar className="text-gray-300 text-xl" />}
              />
            </div>
            <textarea
              {...register('product_review', { required: 'Review is required' })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows="4"
              placeholder="Write your review here..."
            ></textarea>
            {/* <input
              type="file"
              {...register('product_image')}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            /> */}
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md mt-4">
              Submit Review
            </button>
          </form>
        </div>
      </div>

      <div className="lg:w-1/2 w-full p-4 border rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Reviews from Customers</h2>
        <div className="flex flex-col gap-6">
          {reviews.length > 0 ? reviews.map((review) => (
            <div key={review.order_review_id} className="border-b pb-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Rating
                  initialRating={review.rating}
                  readonly
                  fullSymbol={<FaStar className="text-yellow-400 text-xl" />}
                  emptySymbol={<FaRegStar className="text-gray-300 text-xl" />}
                />
              </div>
              <p className="font-bold">{review.review}</p>
              <div className="text-sm text-gray-600 flex items-center justify-between">
                <span>{review.name} posted on {new Date(review.created_at).toLocaleDateString()}</span>
                <div className="flex items-center">
                  <FaThumbsUp className="mr-1" /> {review.likes}
                </div>
              </div>
            </div>
          )) : (
            <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingsReviews;
