import React from 'react'
import './MobileNavigation.css'
import { mobileNavigation} from '../contants/navigation'
import { NavLink } from 'react-router-dom'
const MobileNavigation = () => {
  return (
    <section className='SectionMobile '>
      <div className='navLinks' >
        {
        mobileNavigation.map((nav,index)=>{
          return(
            <NavLink key={nav.label+'mobileNavigation'}
            className={({isActive})=>'navlink'}
            >
              <div >
                {nav.icon}
              </div>
              <p className='p'>{nav.label}</p>  
            </NavLink>
          )
        })
      }
      </div>
    </section>
  )
}

export default MobileNavigation
