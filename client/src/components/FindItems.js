import React from 'react';
import useFetch from '../hooks/useFetch';
import '../styles/Items.css';
import { Link, useNavigate } from 'react-router-dom';

function FindItems() {
  const { data: items, loading: itemsLoading } = useFetch('/items');
  const { data: categories, loading: categoriesLoading } = useFetch('/categories');
  const { data: itemCount, loading: countLoading } = useFetch('/items/count');
  const navigate = useNavigate();

  if (itemsLoading || categoriesLoading || countLoading) {
    return <div>Loading...</div>;
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find(category => category._id === categoryId);
    return category ? category.name: '';
  }

  const handleRowClick = (id) => {
    navigate(`/items/${id}`);
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
            <tr key={item._id} onClick={() => handleRowClick(item._id)}>
              <td>{item.name}</td>
              <td>{getCategoryName(item.category)}</td>
              <td>{item.price}</td>
              <td>{item.numberInStock}</td>
              <td><a href={item.url}>Link</a></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to='/add-items'><button className='btn-add'>+ Add Item</button></Link>
    </div>
    </>
  );
}

export default FindItems;