"use client";

import React, { useState, useEffect, useRef, useContext } from 'react';
import { MdLocalLibrary, MdMenu, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';
import toast from "react-hot-toast";
import Link from 'next/link';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


 
  const navLinks = (
    <>
      <Link href='/' className='' onClick={() => setMenuOpen(false)}>Home</Link>
      <Link href='/all-books' className='' onClick={() => setMenuOpen(false)}>All Books</Link>
      {/* {user && ( */}
        <>
          <Link href='/add-book' className='' onClick={() => setMenuOpen(false)}>Add Book</Link>
          <Link href='/my-books' className='' onClick={() => setMenuOpen(false)}>My Books</Link>
        </>
      {/* )} */}
    </>
  );

  const userLinks = (
    <>
      <Link href='/register' className='btn btn-primary' onClick={() => setMenuOpen(false)}>Register</Link>
      <Link href='/login' className='btn btn-outline btn-secondary px-6' onClick={() => setMenuOpen(false)}>Login</Link>
    </>
  );

  const loggedInUserLinks = (
    <div className='flex items-center gap-3'>
      <div className='h-10 w-10'>
          {/* <img className='h-full w-full rounded-full ring-2 ring-blue-500/50' src={user?.photoURL} alt={user?.displayName} /> */}
      </div>
      <button className='my-button-secondary text-sm'>Logout</button>
    </div>
  );



  return (
    <header className='sticky top-0 z-50 bg-base-100 shadow-md px-4 md:px-8 py-4 flex justify-between items-center'>

      <Link href='/' className='flex items-center gap-2 font-bold text-xl md:text-2xl'>
        <MdLocalLibrary size={32} className='logo-color' />
        <span>The Book Haven</span>
      </Link>

      <nav className='hidden lg:flex items-center gap-5'>
        {navLinks}
        {/* {
          loading ? (
            <div className='flex items-center gap-5'>
              <div className='skeleton h-10 w-10 rounded-full'></div>
              <div className='skeleton w-16 btn rounded-md '></div>
            </div>
          ) : user ? loggedInUserLinks : userLinks

        } */}
        {userLinks}
      </nav>

      <button className='lg:hidden text-2xl cursor-pointer' onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <MdClose /> : <MdMenu />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className='absolute right-4 top-full mt-2 w-64 bg-base-100 shadow-lg rounded-lg flex flex-col gap-4 p-4 lg:hidden z-50'
          >
            <div className='flex flex-col gap-3'>
              {navLinks}
            </div>
            <div className='flex justify-between items-center mt-3'>
              {/* {user ? loggedInUserLinks : userLinks} */}
              {userLinks}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};

export default Navbar;
