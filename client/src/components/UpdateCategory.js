import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Categories.css';
import '../styles/Form.css';
import { URL } from '../App';

function UpdateCategory() {
    const [categories, setCategories] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${URL}/categories/${id}`)
            .then(response => {
                setCategories(response.data);
                console.log(categories);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);    

    if(!categories){
        return <div className='loader'></div>
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (window.confirm('Are you sure you want to update this category?')) {
            axios.put(`/categories/${id}`, categories)
            .then(() => {
                navigate(`/categories/${id}`);
            })
            .catch(error => {
                console.error(`There was an error updating the category: ${error}`);
            });
        }
    };

    const handleChange = (event) => {
        setCategories({...categories, [event.target.name]: event.target.value});
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
        <div className='form-header'>
            <p>Edit Category</p>
        </div>
        <h3><span>1</span> Category Information:</h3>
        <div className='form-group'>
            <label>Name:</label>
            <input type="text" name="name" value={categories.name} onChange={handleChange} required/>
        </div>
        <div className='form-group'>
            <label>Description:</label>
            <input type="text" name="description" value={categories.description} onChange={handleChange} required/>
        </div>
            <h3><span>2</span> Sales Information:</h3>
            <div className='form-group'>
                <label>URL:</label>
                <input type="text" name="url" value= {categories.url} onChange={handleChange} required/>
            </div>
            <div className='submit-container'>
            <input type="submit" value="Submit" className='btn-submit'/>
            </div>
        </form>
        </>
    );
}

export default UpdateCategory;