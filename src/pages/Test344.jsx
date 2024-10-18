import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
            "Channel-Code": 'ANDROID'
          }
        });
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
    <div className='w-screen bg-blue-50'>
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.c_id} className="category-section">
            <span 
              className="text-lg font-medium text-gray-800 hover:text-orange-600 cursor-pointer inline-block"
              onClick={() => handleCategoryClick(category.c_id)}
            >
              {category.category}: 
            </span>
            {category.sub_categories.length > 0 && (
              <span className="ml-2 inline-block">
                {category.sub_categories.map((subCategory, index) => (
                  subCategory.show === "1" && (
                    <span 
                      key={subCategory.c_id} 
                      className="text-sm text-gray-600 hover:text-orange-600 cursor-pointer"
                      onClick={() => handleSubCategoryClick(subCategory.c_id)}
                    >
                      {subCategory.category}{index < category.sub_categories.length - 1 ? ' | ' : ''}
                    </span>
                  )
                ))}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ListComponentHome;
