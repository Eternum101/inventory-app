import React from 'react';
import useFetch from '../hooks/useFetch';
import '../styles/Categories.css';
import '../styles/Table.css';
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
        <div className='items-header-right'>
        <div className='category-count'>
            <p>All Categories <span>{categoriesCount}</span></p>
        </div>
        <div className='btn-container'>
          <Link to='/add-category'><button className='btn-add'>+ Add Category</button></Link>
        </div>
        </div>
        </div>
        <div className='table-container'>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
            {categories.map(category => (
                <tr key={category._id} onClick={() => handleRowClick(category._id)}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      );
    }

export default FindCategories;
