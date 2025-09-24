import React, { useContext, useEffect, useState } from 'react';
import  {Link, NavLink}  from 'react-router-dom';
// import {AuthContext} from '../../../context/AuthContext';
import logo from '../../../assets/logos/LifeLink-Logo.svg'
import Button from '../../ui/Button'

export default function Navbar() {
    return (
        <header>
            <nav className='bg-[#FDFBF9] px-55 pt-2 pb-2 flex justify-between items-center shadow-[0_4px_10px_rgba(0,0,0,0.05)] fixed top-0 left-0 right-0 z-50'>
                <Link to="/">
                    <img src={logo} className='w-auto h-[40px]'/>
                </Link>
                <div className='flex gap-6 ' style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
                    <NavLink>Home</NavLink>
                    <NavLink>About</NavLink>
                    <NavLink>How it works</NavLink>
                    <NavLink>Contact</NavLink>
                </div>
                <div className='flex gap-2'>
                    <Button className='text-white text-sm'>Donate Now</Button>
                    <Button className='bg-[#921223]/18 text-black '>Sign In</Button>
                </div>
            </nav>
        </header>
    )
}