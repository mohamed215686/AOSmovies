import React, { useEffect, useState } from 'react'
import './Header.css'
import {Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUserAlt,FaSearch } from "react-icons/fa";
const Header = () => {
  const [SearchInput,SetSearchInput]=useState('')
  const navigate=useNavigate()
  
  const navigation=[
    {
      label : "TV shows",
      href : 'tv'
    },
    {
      label : "Movies",
      href : 'movie'
    }
  ]
  useEffect(()=>{
    navigate('/search?q=' + SearchInput)
  },[SearchInput])
  const handleSubmit=(e)=>{
    e.preventDefault()
  }

  return (
    <div className='fixed-header'>
      <div className='container'>
        <div className='logo'>
          <Link to ={'/'}>
          <img src='logo.png' alt='logo' width={120} />
        </Link>
        </div>
        
        <nav className='nav-links'>
          {
            navigation.map((nav,index)=>{
              return(
                <div >
                  <NavLink key={nav.label} to={nav.href} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    {nav.label}
                  </NavLink>
                </div>
              )})
          }
        </nav>
        <div className='user '>
          <form className='search_form' onSubmit={handleSubmit}>
            <input 
            type='text'
            placeholder='search here...'
            className='search_bar '
            onChange={(e)=>SetSearchInput(e.target.value)}
            value={SearchInput}
            />
            <button className='search_icon'>
                <FaSearch/>
            </button>
          </form>
        
          <div className="user_icon">
                <FaUserAlt />
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Header
