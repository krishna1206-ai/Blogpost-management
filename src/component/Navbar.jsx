import React from 'react'
import "./Navbar.css";
import { NavLink, useNavigate } from 'react-router-dom'
import {FaBlog,FaHome,FaPlusSquare,FaSignOutAlt,FaChartLine, FaMoon, FaSun, FaStar } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext';
const Navbar = () => {
    const navigate=useNavigate();
    const {theme,toggleTheme}=useTheme();
    const authData=JSON.parse(localStorage.getItem("authData"));
    const handleLogout=()=>{
        localStorage.removeItem("authData");
        localStorage.removeItem("user");
        navigate("/login");
    };
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
                 <NavLink to='/favourite' className="nav-item">
                    <FaStar  className="nav-icon"/>Favourites
                </NavLink>
            </div>
            <div className="navbar-action">
                <span className="user-name">
  Hi, {authData?.name || "User"}
</span>
                <button className="theme-toggle-btn" onClick={toggleTheme} aria-label='Toggle Theme'>{theme === 'light'?<FaMoon/>:<FaSun/>}</button>
                <button className="logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt/>Logout
                </button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
