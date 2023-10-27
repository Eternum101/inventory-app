import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Home.css'
import { LuPackageCheck, LuFolderArchive } from 'react-icons/lu'

function Home() {
    const [itemCount, setItemCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);

    useEffect(() => {
        axios.get('/items/count')
        .then(res => setItemCount(res.data))
        .catch(error => console.error(`There was an error retrieving the item count: ${error}`));

        axios.get('/categories/count')
        .then(res => setCategoryCount(res.data))
        .catch(error => console.error(`There was an error retrieving the category count: ${error}`));
    }, []);

    return (
    <>
    <div className="content-container">
        <div className="inventory-summary-container">
            <h1>Inventory Summary</h1>
            <div className="summary-container">
                <div className="count-summary">
                    <LuPackageCheck className="icon-1"/>
                    <p>Total Number of Items:</p> <span>{itemCount}</span>
                </div>
                <div className="count-summary">
                    <LuFolderArchive className="icon-2"/>
                    <p>Total Number of Categories:</p> <span>{categoryCount}</span>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default Home;