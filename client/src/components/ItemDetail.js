import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import '../styles/Items.css'; 
import axios from 'axios';
import { URL } from '../App';

function ItemDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: items, loading: itemsLoading } = useFetch(`${URL}/items/${id}`);
    const { data: categoriesData, loading: categoriesLoading } = useFetch(`${URL}/categories`);
  
    if (itemsLoading || categoriesLoading) {
        return <div className='loader'></div>;
    }

    const getCategoryName = (categoryId) => {
        const category = categories.find(category => category._id === categoryId);
        return category ? category.name: '';
    }

    const handleDelete = () => {
      if (window.confirm('Are you sure you want to delete this item?')) {
      axios.delete(`${URL}/items/${id}`)
        .then(response => {
          console.log(response);
          navigate('/items');
        })
        .catch(error => {
          console.error('There was an error!', error);
        })
    }
  }

  const categories = categoriesData.message;
  
    return (
        <div className='item-detail-container'>
            <div className='item-detail-header'>
                <h1>{items.name}</h1>
                <p>{items.description}</p>
            </div>
            <div className='item-detail-body'>
              <p><strong>Category:</strong> {getCategoryName(items.category)}</p>
              <p><strong>Price:</strong> ${items.price}</p>
              <p><strong>In Stock:</strong> {items.numberInStock}</p>
              <a href={items.url} className='item-link'>Link</a>
              <div className='btn-items'>
                <button className='btn-update' onClick={() => navigate(`/items/update/${id}`)}>Update Item</button>
                <button className='btn-delete' onClick={handleDelete}>Delete Item</button>
              </div>
            </div>
        </div>
      );
}

export default ItemDetail;
