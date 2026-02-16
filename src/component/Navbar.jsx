import React from 'react'
import "./Navbar.css";
import { NavLink } from 'react-router-dom'
import {FaBlog,FaHome,FaPlusSquare,FaSignOutAlt,FaChartLine } from 'react-icons/fa'
const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="navbar-container">
            <div className="navbar-logo">
                <FaBlog className="logo-icon"/>
                <span className="logo-text">BlogPost</span>
            </div>
            <div className="navbar-links">
                <NavLink to='/dashboard' className="nav-item">
                    <FaHome className="nav-icon"/>Home
                </NavLink>
                 <NavLink to='/create-post' className="nav-item">
                    <FaPlusSquare className="nav-icon"/>Create Post
                </NavLink>
                  <NavLink to='/analytics' className="nav-item">
                    <FaChartLine  className="nav-icon"/>Analysis
                </NavLink>
            </div>
            <div className="navbar-action">
                <span className="user-name">Hi,user</span>
                <button className="logout-btn">
                    <FaSignOutAlt/>Logout
                </button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
