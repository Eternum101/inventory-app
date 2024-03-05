import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../styles/Categories.css';
import '../styles/Form.css';
import { useNavigate } from 'react-router-dom';
import { URL } from '../App';

function AddCategory() {
    const [categories, setCategories] = useState({
        name: '',
        description: '', 
        url: '',
    });

    const handleChange = (e) => {
        setCategories({
            ...categories,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate();

    const formRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${URL}/categories`, categories)
            .then(response => {
                console.log(response);
                setCategories({
                    name: '',
                    description: '',
                    url: '',
                });
                formRef.current.reset();
                navigate(`/categories/`);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }; 
    
    return (
        <>
        <form onSubmit={handleSubmit} ref={formRef}>
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
