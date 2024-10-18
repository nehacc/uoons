import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ListComponentHome = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/getAllCategories', {
          headers: {
            'Channel-Code': 'ANDROID',
          },
        });
        setCategories(response.data.Data.categories);
        console.log(response.data.Data.categories);
      } catch (error) {
        setError(`Error fetching categories: ${error.message}`);
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (c_id) => {
    navigate(`/ProductList/${c_id}`);
  };

  const handleSubCategoryClick = (c_id) => {
    navigate(`/ProductList/${c_id}`);
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>{' '}
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <ul className="w-full container flex justify-center items-center flex-wrap gap-4 gap-y-0">
      {categories.map((category) => (
        <li key={category.c_id} className="group cursor-pointer">
          <button
            className="flex items-center gap-2 py-2 hover:text-orange-600 focus:outline-none"
            onClick={() => handleCategoryClick(category.c_id)}
          >
            {category.category || 'Unnamed Category'}
            <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
          </button>
          {category.sub_categories?.length > 0 && (
            <div className="absolute left-0 right-0 z-50 border hidden group-hover:flex w-screen bg-white p-2 text-black shadow-md">
              <ul className="container mx-auto grid grid-rows-6 grid-flow-col justify-start gap-1 md:gap-x-16 lg:gap-x-40 gap-y-2 h-fit">
                {category.sub_categories.map(
                  (subCategory) =>
                    subCategory.show === '1' && (
                      <li
                        key={subCategory.c_id}
                        className="py-1 hover:text-orange-600 cursor-pointer text-left"
                        onClick={() => handleSubCategoryClick(subCategory.c_id)}
                      >
                        {subCategory.category || 'Unnamed Subcategory'}
                      </li>
                    )
                )}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ListComponentHome;
