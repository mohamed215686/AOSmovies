import React from 'react'
import {Link } from 'react-router-dom';
import './Footer.css'
const Footer = () => {
  return (
    <footer className='footer '>
      <div className='about-contact  '>
        <Link to='/'>About</Link>
        <Link to='/'>Contact</Link>
      </div>
      <p className='credit '>Created By YAHYA & AFKIR</p>
    </footer>
  )
}

export default Footer
