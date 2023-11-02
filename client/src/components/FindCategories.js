import React from 'react';
import useFetch from '../hooks/useFetch';
import '../styles/Categories.css';
import { Link, useNavigate } from 'react-router-dom';

function FindCategories() {
    const { data: categories, loading: categoriesLoading } = useFetch('/categories');
    const { data: categoriesCount, loading: countLoading } = useFetch('/categories/count');
    const navigate = useNavigate(); 

    if (categoriesLoading || countLoading) {
      return <div>Loading...</div>;
    }

    const handleRowClick = (id) => {
      navigate(`/categories/${id}`);
    }

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
                <tr key={category._id} onClick={() => handleRowClick(category._id)}>
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
