import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Items.css';

function UpdateItem() {
    const [items, setItems] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`/items/${id}`)
        .then(response => {
            setItems(response.data);
        })
        .catch(error => {
            console.error(`There was an error retrieving the item data: ${error}`);
        });
    }, [id]);

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

    if(!items){
        return <div>Loading...</div>
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (window.confirm('Are you sure you want to update this item?')) {
            axios.put(`/items/${id}`, items)
            .then(() => {
                navigate(`/items/${id}`);
            })
            .catch(error => {
                console.error(`There was an error updating the item: ${error}`);
            });
        }
    };

    const handleChange = (event) => {
        setItems({...items, [event.target.name]: event.target.value});
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
        <div className='form-header'>
            <p>Edit Item</p>
        </div>
        <h3><span>1</span> Item Information:</h3>
        <div className='form-group'>
            <label>Name:</label>
            <input type="text" name="name" value={items.name} onChange={handleChange} required/>
        </div>
        <div className='form-group'>
            <label>Description:</label>
            <input type="text" name="description" value={items.description} onChange={handleChange} required/>
        </div>
        <div className='form-group'>
            <label>Category:</label>
            <select name="category" value={items.category} onChange={handleChange} required>
                {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>
        </div>
            <h3><span>2</span> Sales Information:</h3>
            <div className='form-group'>
                <label>Price:</label>
                <input type="number" name="price" value={items.price} onChange={handleChange} required/>
            </div>
            <div className='form-group'>
                <label>Number in Stock:</label>
                <input type="number" name="numberInStock" value={items.numberInStock} onChange={handleChange} required/>
            </div>
            <div className='form-group'>
                <label>URL:</label>
                <input type="text" name="url" value={items.url} onChange={handleChange} required/>
            </div>
            <div className='submit-container'>
            <input type="submit" value="Submit" className='btn-submit'/>
            </div>
        </form>
        </>
    );
}

export default UpdateItem;