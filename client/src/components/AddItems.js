import React, { useState, useRef } from 'react';
import axios from 'axios';
import useFetch from '../hooks/useFetch';
import '../styles/Items.css';
import '../styles/Form.css';
import { useNavigate } from 'react-router-dom';
import { URL } from '../App';

function AddItems() {
    const [items, setItems] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        numberInStock: '',
        url: ''
    });

    const { data: categoriesData, loading: categoriesLoading } = useFetch(`${URL}/categories`);

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setItems({
            ...items,
            [e.target.name]: e.target.value
        });
    };

    const formRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${URL}/items`, items)
            .then(response => {
                console.log(response);
                setItems({
                    name: '',
                    description: '',
                    category: '',
                    price: '',
                    numberInStock: '',
                    url: '',
                });
                formRef.current.reset();
                navigate(`/items/`);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };
    
    if (categoriesLoading) {
        return <div className='loader'></div>;
    }

    const categories = categoriesData.message;

    return (
        <>
        <form onSubmit={handleSubmit} ref={formRef}>
        <div className='form-header'>
            <p>Add New Item</p>
        </div>
        <h3><span>1</span> Item Information:</h3>
        <div className='form-group'>
            <label>Name:</label>
            <input type="text" name="name" onChange={handleChange} required/>
        </div>
        <div className='form-group'>
            <label>Description:</label>
            <input type="text" name="description" onChange={handleChange} required/>
        </div>
        <div className='form-group'>
            <label>Category:</label>
            <select name="category" onChange={handleChange} required>
                {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>
        </div>
            <h3><span>2</span> Sales Information:</h3>
            <div className='form-group'>
                <label>Price:</label>
                <input type="number" name="price" onChange={handleChange} required/>
            </div>
            <div className='form-group'>
                <label>Number in Stock:</label>
                <input type="number" name="numberInStock" onChange={handleChange} required/>
            </div>
            <div className='form-group'>
                <label>URL:</label>
                <input type="text" name="url" onChange={handleChange} required/>
            </div>
            <div className='submit-container'>
            <input type="submit" value="Submit" className='btn-submit'/>
            </div>
        </form>
        </>
    );
}

export default AddItems; 