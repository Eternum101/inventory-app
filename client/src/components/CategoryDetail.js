import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import '../styles/Categories.css';

function CategoriesDetail() {
    const { id } = useParams();
    const { data: categories, loading } = useFetch(`/categories/${id}`);
    const navigate = useNavigate(); 

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className='category-detail-container'>
          <div className='category-detail-header'>
              <h1>{categories.name}</h1>
              <p>{categories.description}</p>
          </div>
          <div className='category-detail-body'>
            <a href={categories.url} className='category-link'>Link</a>
            <div className='btn-category'>
              <button className='btn-update' onClick={() => navigate(`/categories/update/${id}`)}>Update category</button>
              <button className='btn-delete'>Delete category</button>
            </div>
          </div>
      </div>
    );
}

export default CategoriesDetail;
