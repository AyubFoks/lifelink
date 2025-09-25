import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";
import logo from '../../../assets/logos/LifeLink-Logo.svg'
import Button from '../../ui/Button'

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav className="bg-[#FDFBF9] px-4 py-3 shadow-md fixed top-0 left-0 right-0 z-50">
        {/* Top bar: Logo + Hamburger */}
        <div className="flex max-w-7xl mx-auto px-6 md:px-12 justify-between items-center">
          <Link to="/">
            <img src={logo} className="w-auto h-[40px]" alt="LifeLink logo" />
          </Link>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden flex flex-col gap-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="w-6 h-0.5 bg-black"></span>
            <span className="w-6 h-0.5 bg-black"></span>
            <span className="w-6 h-0.5 bg-black"></span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-20 ml-6" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Button onClick={() => nav("/login/donor")} className="text-white text-sm">Donate Now</Button>
                <Button onClick={() => nav('/login/donor')} className="bg-[#921223]/18 text-black">Sign In</Button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-sm text-[#921223]">
                  <span className="mr-1">Hi,</span>
                  <span className="font-semibold">{(user.full_name || user.name || user.adminName || user.email)}</span>
                </div>
                <Button onClick={() => { logout(); nav("/"); }} className="px-3 py-2 text-white">Logout</Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="flex flex-col gap-4 mt-4 md:hidden bg-[#FDFBF9] px-4 py-4 shadow-md rounded-md">
            <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
            <NavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>

            <div className="flex flex-col gap-2 mt-2">
              {!user ? (
                <>
                  <Button onClick={() => { setIsOpen(false); nav("/login/donor") }} className="text-white text-sm">Donate Now</Button>
                  <Button onClick={() => { setIsOpen(false); nav('/login/donor') }} className="bg-[#921223]/18 text-black">Sign In</Button>
                </>
              ) : (
                <>
                  <div className="text-sm text-[#921223] mb-2">
                    <span className="mr-1">Hi,</span>
                    <span className="font-semibold">{(user.full_name || user.name || user.adminName || user.email)}</span>
                  </div>
                  <Button onClick={() => { logout(); nav("/"); setIsOpen(false); }} className="px-3 py-2 text-white">Logout</Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

