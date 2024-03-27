import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import "../css/style.css";
import magn from "../img/icons/magnifier.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [name, setName] = useState('')
  useEffect(() => {

    const token = localStorage.getItem('token');
    setName(localStorage.getItem('name'))
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);


  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/login"
  };

  return (
    <div className="navbar">
      <div className="container navbar__container">
        <Link className="navbar__brand" to="/">
          <img alt="Elite Sports" src="./favicon.ico" />
          Elite Sports
        </Link>
        <nav className="navbar__nav">
          <Link className="navbar__link" to="/">Home</Link>
          <Link className="navbar__link" to="/fields">Fields</Link>
          <Link className="navbar__link" to="/">About</Link>
        </nav>
        <div className="navbar__right">
          <Link className="navbar__search" to="/fields">
            <img alt="Search" src={magn} />
          </Link>
          <p>Hi! {name} </p>
          {isLoggedIn ? (
            <button className="navbar__cta" onClick={handleLogout}>Logout</button>
          ) : (
            <Link className="navbar__cta" to="/login">Sign in</Link>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
