import React, { useEffect, useState } from 'react'
import './Header.css'
import {Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaUserAlt,FaSearch } from "react-icons/fa";
import { navigation } from '../contants/navigation';

const Header = () => {
  const location=useLocation()
  const removespace=location?.search?.slice(3)?.split("%20")?.join(" ")
  const [SearchInput,SetSearchInput]=useState(removespace)
  const navigate=useNavigate()
  
  
  console.log("location")
  useEffect(()=>{
    if(SearchInput){
      navigate('/search?q=' + SearchInput)
    }
    
  },[SearchInput])
  const handleSubmit=(e)=>{
    e.preventDefault()
  }

  return (
    <header className='fixed-header'>
      <div className='container'>
  
  <div className='left-side'>
    <div className='logo'>
      <Link to={'/'}>
        <img src='logo.png' alt='logo' width={120} />
      </Link>
    </div>

    <nav className='nav-links'>
      {navigation.map((nav) => (
        <div key={nav.label}>
          <NavLink to={nav.href} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            {nav.label}
          </NavLink>
        </div>
      ))}
    </nav>
  </div>

  
  <div className='user'>
    <form className='search_form' onSubmit={handleSubmit}>
      <input 
        type='text'
        placeholder='search here...'
        className='search_bar'
        onChange={(e)=>SetSearchInput(e.target.value)}
        value={SearchInput}
      />
      <button className='search_icon'>
        <FaSearch />
      </button>
    </form>

    <div className="user_icon">
      <FaUserAlt />
    </div>
  </div>
</div>
</header>
  )
}

export default Header