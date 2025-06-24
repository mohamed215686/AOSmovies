import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom';
const Header = () => {
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
  return (
    <div className='fixed-header'>
      <div className='container'>
        <div>
          <img src='logo.png' alt='logo' width={120} />
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
      </div>
    </div>
    
  )
}

export default Header
