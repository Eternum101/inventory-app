import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error(`There was an error retrieving the category data: ${error}`);
      });
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      {categories.map(category => (
        <div key={category._id}>
          <h3>{category.name}</h3>
          <h3>{category.description}</h3>
          {/* Add more category details here */}
        </div>
      ))}
    </div>
  );
}

export default Category;
