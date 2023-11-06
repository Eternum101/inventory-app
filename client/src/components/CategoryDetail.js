import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import '../styles/Categories.css';
import axios from 'axios';

function CategoriesDetail() {
    const { id } = useParams();
    const { data: categories, loading } = useFetch(`/categories/${id}`);
    const navigate = useNavigate(); 

    if (loading) {
      return <div className='loader'></div>;
    }

    const handleDelete = () => {
      if (window.confirm('Are you sure you want to delete this category?')) {
      axios.delete(`/categories/${id}`)
        .then(response => {
          console.log(response);
          navigate('/categories');
        })
        .catch(error => {
          console.error('There was an error!', error);
        })
    }
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
              <button className='btn-update' onClick={() => navigate(`/categories/update/${id}`)}>Update Category</button>
              <button className='btn-delete' onClick={handleDelete}>Delete Category</button>
            </div>
          </div>
      </div>
    );
}

export default CategoriesDetail;
