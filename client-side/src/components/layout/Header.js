import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../theme-toggle/ThemeToggle'

const Header = () => {

const [isDark, setDark] = useState(false);

  return (
    <header className="p-3 mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to='/' className='nav-link px-2 link-light'> Home </Link>
            </li>
            
          </ul>
          <div className='d-flex align-items-center'>
              <ThemeToggle
                  isDark={isDark}
                  invertedIconLogic
                  onChange={() => setDark((prev) => !prev)}
              />
              <Link to='/login' className="nav-link link-light">Login</Link> <span className='nav-link link-light'> | </span>
              <Link to='/register' className="nav-link link-light"> Register</Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header