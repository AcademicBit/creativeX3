import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-content">
                    <Link to="/" className="logo">StackGreek</Link>
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