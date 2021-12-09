import React, {useState} from 'react';
import './header.css';
import { MenuItems } from "./MenuItems";
import {FaSignInAlt} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



function Header() {

    // Navigation
    const navigate = useNavigate();

    // Logout function
    const logout = async () => {

        Cookies.remove('user');

        navigate('/');
    }


    return(
        <div className="container">

            <div className="title">
                <label style={{ fontSize: 30, }}>
                    RENTRABBIT
                </label>
            </div>

            {/* Use the navbar items to from MenuItems to route to different pages when clicked */}
            <nav className="NavbarItems">
                <div className="nav-menu">
                    {MenuItems.map((item, index) => {
                        return (
                            <div key={index} className="nav-icon-div">
                                <a className='nav-icon' href={item.url} >
                                    {item.icon}
                                </a>
                            </div>
                        )
                    })}
                    <div>
                        <FaSignInAlt className="nav-icon" onClick={logout} title="Login/Logout" />
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
