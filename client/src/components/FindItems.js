import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Items.css'
import { Link } from 'react-router-dom';

function FindItems() {
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error(`There was an error retrieving the item data: ${error}`);
      });

    axios.get('/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error(`There was an error retrieving the category data: ${error}`);
      });

    axios.get('/items/count')
      .then(res => setItemCount(res.data))
      .catch(error => console.error(`There was an error retrieving the item count: ${error}`));
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find(category => category._id === categoryId);
    return category ? category.name: '';
  }

  return (
    <>
    <div className='items-header'>
      <p className='item-list'>Items List</p>
    <div className='items-count'>
        <p>All Items <span>{itemCount}</span></p>
    </div>
    </div>
    <div className='items-table-container'>
      <table className='items-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Number in Stock</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
        {items.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{getCategoryName(item.category)}</td>
              <td>{item.price}</td>
              <td>{item.numberInStock}</td>
              <td><a href={item.url}>Link</a></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='btn-add'><Link to='/add-items'>+ Add Item</Link></button>
    </div>
    </>
  );
}

export default FindItems;
