import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Categories.css';
import { Link } from 'react-router-dom';

function FindCategories() {
    const [categories, setCategories] = useState([]);
    const [categoriesCount, setCategoriesCount] = useState(0);
  
    useEffect(() => {
      axios.get('/categories')
        .then(response => {
          setCategories(response.data);
          console.log(categories);
        })
        .catch(error => {
          console.error(`There was an error retrieving the category data: ${error}`);
        });

    axios.get('/categories/count')
        .then(res => setCategoriesCount(res.data))
        .catch(error => console.error(`There was an error retrieving the item count: ${error}`));
    }, []);

    return (
        <>
        <div className='category-header'>
          <p className='category-list'>Category List</p>
        <div className='category-count'>
            <p>All Categories <span>{categoriesCount}</span></p>
        </div>
        </div>
        <div className='category-table-container'>
          <table className='category-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
            {categories.map(category => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td><a href={category.url}>Link</a></td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to='/add-category'><button className='btn-add'>+ Add Category</button></Link>
        </div>
        </>
      );
    }

export default FindCategories;