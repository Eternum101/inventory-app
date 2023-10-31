import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Categories.css';

function AddCategory() {
    const [categories, setCategories] = useState({
        name: '',
        description: '', 
        url: '',
    });

    useEffect(() => {
        axios.get('/categories')
            .then(response => {
                setCategories(response.data);
                console.log(categories);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleChange = (e) => {
        setCategories({
            ...categories,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/categories', categories)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };       

    return (
        <>
        <form onSubmit={handleSubmit}>
        <div className='form-header'>
            <p>Add New Category</p>
        </div>
        <h3><span>1</span> Category Information:</h3>
        <div className='form-group'>
            <label>Name:</label>
            <input type="text" name="name" onChange={handleChange} required/>
        </div>
        <div className='form-group'>
            <label>Description:</label>
            <input type="text" name="description" onChange={handleChange} required/>
        </div>
            <h3><span>2</span> Sales Information:</h3>
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

export default AddCategory;