import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCaretDown } from 'react-icons/fa';

const ListComponentHome = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch the categories data from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('api/getAllCategories'); // Replace with your API URL
        setCategories(response.data.Data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <ul className="category-list container flex justify-center flex-wrap gap-8 gap-y-0">
      {categories.map(category => (
        <li key={category.c_id} className="group relative cursor-pointer">
          <a href="#" className="flex items-center gap-[2px] py-2 hover:text-orange-600">
            {category.category}
            <span>
              <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
            </span>
          </a>
          {category.sub_categories.length > 0 && (
            <div className="absolute z-[9999] border hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {category.sub_categories.map(subCategory => (
                  subCategory.show === "1" && (
                    <li key={subCategory.c_id} className="py-1 hover:text-orange-600">
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
