import './Navbar.css'
import React from 'react'

// importing image
import hamburgerIcon from '../../assets/more.png';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <div className='logo-container'>
        <Link to='/'>
          <h2>PokiMane</h2>
        
        </Link>
      </div>

      <div className='page-navs'>
        <div className='page-links'>
          <Link><p>Listing Page</p></Link>
          <Link to='/bookmark'><p>Bookmarks</p></Link>
        </div>

        <div className='hamburger-icon'>
          <img className='hamburger' src={hamburgerIcon}></img>
        </div>
      </div>
    </nav>
  )
}

export default Navbar