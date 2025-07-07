import React from 'react'
import {Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='text-center'>
      <div className='flex items-center justify-center gap-4'>
        <Link to='/'>About</Link>
        <Link to='/'>Contact</Link>
      </div>
      <p>Created By who know ? hhhh</p>
    </footer>
  )
}

export default Footer
