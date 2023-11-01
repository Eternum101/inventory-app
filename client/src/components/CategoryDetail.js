import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CategoriesDetail() {
    const [categories, setCategories] = useState(null);
    const { id } = useParams(); // get the id from the URL

    useEffect(() => {
      axios.get(`/categories/${id}`)
        .then(response => {
          setCategories(response.data);
        })
        .catch(error => {
          console.error(`There was an error retrieving the categories data: ${error}`);
        });
    }, [id]); // re-run the effect when the id changes

    if (!categories) {
      return <div>Loading...</div>; // display a loading message while the data is being fetched
    }

    return (
        <div>
          <h1>{categories.name}</h1>
          <p>{categories.description}</p>
          <a href={categories.url}>Link</a>
        </div>
      );
}

export default CategoriesDetail;
