import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ThemeToggle from '../theme-toggle/ThemeToggle'
import toast, { Toaster } from 'react-hot-toast'

const Header = () => {
  const navigate = useNavigate();
  const [isDark, setDark] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  },[])

  const handleLogout = () => {
    toast.success("You are loggin out")
    localStorage.removeItem("token");
    setToken(null);
    setTimeout(()=>{
      navigate('/login');
    },500)
  }
  
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
              {
                token ? (
                  <button className="btn logout-btn" onClick={handleLogout}> Logout</button>
                 
                ) : (
                  <>
                  <Link to='/login' className="nav-link link-light">Login</Link>
                  <span className='nav-link link-light'> | </span>
                  <Link to='/register' className="nav-link link-light"> Register</Link>
                </>
                )
              }
          </div>
        </div>
      </div>
      <Toaster />
    </header>
  )
}

export default Header