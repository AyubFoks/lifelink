import React, { useContext, useEffect, useState } from 'react';
import  {Link, NavLink, useNavigate}  from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";
import logo from '../../../assets/logos/LifeLink-Logo.svg'
import Button from '../../ui/Button'

export default function Navbar() {
    const { user, logout } = useAuth();
    const nav = useNavigate();

    return (
        <header>
            <nav className='bg-[#FDFBF9] px-55 pt-2 pb-2 flex justify-between items-center shadow-[0_4px_10px_rgba(0,0,0,0.05)] fixed top-0 left-0 right-0 z-50'>
                <Link to="/">
                    <img src={logo} className='w-auto h-[40px]'/>
                </Link>
                <div className='flex gap-6 ml-6 mr-[-30px]' style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink>Contact</NavLink>
                </div>
                <div className='flex gap-2'>
                    {!user ? (
                        <>
                            <Button onClick={() => nav("/login/donor")} className='text-white text-sm'>Donate Now</Button>
                            <Button onClick={() => nav('/login/donor')} className='bg-[#921223]/18 text-black '>Sign In</Button>
                        </>
                    ) : (
                        <>
                            <span className="mr-2">Hi, {user.name || user.adminName}</span>
                            <button onClick={() => { logout(); nav("/"); }} className="px-3 py-2 border rounded">Logout</button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}