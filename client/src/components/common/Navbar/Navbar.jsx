import React, { useContext, useEffect, useState } from 'react';
import  {Link, NavLink}  from 'react-router-dom';
// import {AuthContext} from '../../../context/AuthContext';
import logo from '../../../assets/logos/LifeLink-Logo.svg'

export default function Navbar() {
    return (
        <header>
            <nav className='flex'>
                <Link to="/">
                    <img src={logo} className='w-auto h-[40px]'/>
                </Link>
                <div>
                    <NavLink>Home</NavLink>
                    <NavLink>About</NavLink>
                    <NavLink>How it works</NavLink>
                    <NavLink>Contact</NavLink>
                </div>
                <div></div>
            </nav>
        </header>
    )
}