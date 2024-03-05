import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import '../styles/Items.css';
import '../styles/Table.css'
import { LuPackageCheck } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import { URL } from '../App';

function FindItems() {
  const { data: itemsData, loading: itemsLoading } = useFetch(`${URL}/items`);
  const { data: categoriesData, loading: categoriesLoading } = useFetch(`${URL}/categories`);
  const { data: itemCount, loading: countLoading } = useFetch(`${URL}/items/count`);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (itemsLoading || categoriesLoading || countLoading) {
    return <div className='loader'></div>;
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find(category => category._id === categoryId);
    return category ? category.name: '';
  }

  const handleRowClick = (id) => {
    navigate(`/items/${id}`);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const categories = categoriesData.message;
  const items = itemsData.message;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
    <div className='items-header'>
      <p className='item-list'>
        <LuPackageCheck />
        Items List
      </p>
    <div className='items-header-right'>
    <div className='items-count'>
        <p>All Items <span>{itemCount}</span></p>
    </div>
    <div className='btn-container'>
        <Link to='/add-items'><button className='btn-add'>+ Add Item</button></Link>
    </div>
    </div>
    </div>
    <div className='table-container'>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>In Stock</th>
          </tr>
        </thead>
        <tbody>
        {currentItems.map(item => (
            <tr key={item._id} onClick={() => handleRowClick(item._id)}>
              <td>{item.name}</td>
              <td>{getCategoryName(item.category)}</td>
              <td>${item.price}</td>
              <td>{item.numberInStock}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination itemsPerPage={itemsPerPage} totalItems={itemCount} paginate={handlePageChange} currentPage={currentPage}/>
    </div>
    </>
  );
}

export default FindItems;
