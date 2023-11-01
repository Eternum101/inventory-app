import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/Items.css'; 

function ItemDetail() {
    const [items, setItems] = useState(null);
    const { id } = useParams();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`/items/${id}`)
          .then(response => {
            setItems(response.data);
          })
          .catch(error => {
            console.error(`There was an error retrieving the categories data: ${error}`);
          });
      }, [id]);
  
      if (!items) {
        return <div>Loading...</div>;
      }

      axios.get('/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error(`There was an error retrieving the category data: ${error}`);
      });

      const getCategoryName = (categoryId) => {
        const category = categories.find(category => category._id === categoryId);
        return category ? category.name: '';
      }

      return (
        <div className='item-detail-container'>
            <div className='item-detail-header'>
                <h1>{items.name}</h1>
                <p>{items.description}</p>
            </div>
            <div className='item-detail-body'>
              <p><strong>Category:</strong> {getCategoryName(items.category)}</p>
              <p><strong>Price:</strong> {items.price}</p>
              <p><strong>Number in Stock:</strong> {items.numberInStock}</p>
              <a href={items.url} className='item-link'>Link</a>
              <div className='btn-items'>
                <button className='btn-update'>Update Item</button>
                <button className='btn-delete'>Delete Item</button>
              </div>
            </div>
        </div>
      );
}

export default ItemDetail;