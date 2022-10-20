import React from 'react';
import "./Navbar.css";

const Navbar = ({ logo, navitems = [] }) => {
    
    const handleChange = (e) => {
    console.log(e.target.value)
} 
  return (
      <div className="navbar-container">
          <div className="logo-container">
              <h1 className='logo'>{logo}</h1>
          </div>

          <div>
              <ul className="nav-ul">
                  {navitems.map((nav, index) => {
                      return <li className='navitems' key={index}> <a href="/nav">{nav}</a></li>
                  })}
              </ul>
          </div>

          <div className="search">
              <input type="search" placeholder='Search...' onChange={handleChange} />
          </div>
      </div>
  )
}

export default Navbar
