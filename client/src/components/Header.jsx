import React from "react";
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { FaChartPie, FaBoxArchive, FaBox } from 'react-icons/fa6';

function Header() {
    return (
        <header>
            <nav>
                <div className="logo">
                    <Link to='/'>
                        <h1>Inventory Application.</h1>
                    </Link>
                </div>
                <div className="navbar-right">
                    <ul>
                        <li><FaChartPie/><Link to='/'>Dashboard</Link></li>
                        <li><FaBoxArchive/><Link to='/items'>Items</Link></li>
                        <li><FaBox/><Link to='/categories'>Categories</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header; 