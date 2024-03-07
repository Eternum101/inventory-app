import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Home.css'
import { LuPackageCheck, LuFolderArchive } from 'react-icons/lu'
import { Link } from 'react-router-dom';
import { URL } from "../App";

function Home() {
    const [itemCount, setItemCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        axios.get(`${URL}/items/count`)
        .then(res => {
            setItemCount(res.data);
            setLoading(false);
        })
        .catch(error => {
            console.error(`There was an error retrieving the item count: ${error}`);
            setLoading(false);
        });

        setLoading(true);
        axios.get(`${URL}/categories/count`)
        .then(res => {
            setCategoryCount(res.data);
            setLoading(false);
        })
        .catch(error => {
            console.error(`There was an error retrieving the category count: ${error}`);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className='loader'></div>;
    }

    return (
    <>
    <div className="content-container">
        <div className="inventory-summary-container">
            <h1>Overall Summary</h1>
            <div className="summary-container">
                <div className="count-summary">
                    <LuPackageCheck className="icon-1"/>
                    <p>Total Number of Items:</p> <span>{itemCount}</span>
                    <Link to='/items'><button className="btn-view">View All Items</button></Link>
                </div>
                <div className="count-summary">
                    <LuFolderArchive className="icon-2"/>
                    <p>Total Number of Categories:</p> <span>{categoryCount}</span>
                    <Link to='/categories'><button className="btn-view">View All Categories</button></Link>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default Home;