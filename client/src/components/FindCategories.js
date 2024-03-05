import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import '../styles/Categories.css';
import '../styles/Table.css';
import { LuFolderArchive } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import { URL } from '../App';

function FindCategories() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const { data: categoriesData, loading: categoriesLoading } = useFetch(`${URL}/categories`);
    const { data: categoriesCount, loading: countLoading } = useFetch(`${URL}/categories/count`);
    const navigate = useNavigate(); 

    if (categoriesLoading || countLoading) {
      return <div className='loader'></div>;
    }

    const handleRowClick = (id) => {
      navigate(`/categories/${id}`);
    }

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    }

    const categories = categoriesData.message;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

    console.log(currentCategories);
    return (
        <>
        <div className='category-header'>
          <p className='category-list'>
            <LuFolderArchive/>
            Category List
          </p>
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
            {currentCategories.map(category => (
                <tr key={category._id} onClick={() => handleRowClick(category._id)}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination itemsPerPage={itemsPerPage} totalItems={categoriesCount} paginate={handlePageChange} currentPage={currentPage} />
        </div>
        </>
      );
    }

export default FindCategories;