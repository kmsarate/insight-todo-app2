import React from 'react';
import '../styles/navbar.css'

const Navbar = () => {
  return (
    <div className="nav-wrapper">
    <div className='right-icon'>
    <li className="menu-icon">Menu</li>
    </div>
    <div className='search-box-container'>
      <div className='search-box'>
        <h1 className='icon'>S</h1>
    <input className='search-bar' type="text" placeholder='Search' ></input>
    </div>
    </div>
      <ul className="left-icon-wrapper">
        <li className="li-wrapper">Setting</li>
        <li className="li-wrapper">Bell</li>
        <li className="li-wrapper">Profile</li>
      </ul>
      </div>
    
  )
};

export default Navbar;