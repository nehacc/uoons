import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCaretDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ListComponentHome = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('api/getAllCategories');
        setCategories(response.data.Data.categories);
      } catch (error) {
        setError('Error fetching categories');
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
    return <div className="text-center py-4"><div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div> Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <ul className="w-full category-list container flex justify-center flex-wrap gap-8 gap-y-0">
      {categories.map(category => (
        <li key={category.c_id} className="group relative cursor-pointer">
          <button 
            className="flex items-center gap-2 py-2 hover:text-orange-600 focus:outline-none" 
            onClick={() => handleCategoryClick(category.c_id)}
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls={`sub-category-list-${category.c_id}`}
          >
            {category.category}
            <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
          </button>
          {category.sub_categories.length > 0 && (
            <div id={`sub-category-list-${category.c_id}`} className="absolute z-50 border hidden group-hover:block w-48 rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {category.sub_categories.map(subCategory => (
                  subCategory.show === "1" && (
                    <li 
                      key={subCategory.c_id} 
                      className="py-1 hover:text-orange-600 cursor-pointer" 
                      onClick={() => handleSubCategoryClick(subCategory.c_id)}
                    >
                      {subCategory.category}
                    </li>
                  )
                ))}
              </ul>
              <button className="cursor-pointer text-blue-700 py-1 ml-auto">
                View All
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ListComponentHome;
