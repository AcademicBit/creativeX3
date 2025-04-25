import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-content">
                    <h1 to="/" className="logo">StackGreek</h1>
                    <div className="nav-links">
                        <Link 
                            to="/" 
                            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/usuarios" 
                            className={`nav-link ${location.pathname === '/usuarios' ? 'active' : ''}`}
                        >
                            Eventos
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 