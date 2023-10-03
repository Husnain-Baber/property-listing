import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import toast, { Toaster } from 'react-hot-toast';
import { FiHome, FiList, FiPlus, FiUser, FiLogOut } from "react-icons/fi";
import ProfileModal from '../modal/ProfileModal';

const Header = () => {
  const navigate = useNavigate();
  const [isDark, setDark] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    status: ''
  })

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    var firstName = localStorage.getItem('firstname');
    var lastName = localStorage.getItem('lastname');
    var email = localStorage.getItem('email');
    setUser({
      first_name: firstName,
      last_name: lastName,
      email: email,
      status: localStorage.getItem('status')
    })

  },[])

  const handleLogout = () => {
    toast.success("You are loggin out")
    localStorage.removeItem("token");
    localStorage.removeItem("status");
    localStorage.removeItem("userid");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("email");
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
              <Link to='/' className='nav-link px-3 link-light'> <FiHome /> Home </Link>
            </li>
            {
              token && (
                <>
                <li>
                <Link to='/create-listing' className='nav-link px-3 link-light'><FiPlus /> Add Listing </Link>
                </li>
                <li>
                  <Link to='/my-listing' className='nav-link px-3 link-light'> <FiList /> My Listing </Link>
                </li>
                </>
              )
            }
            
            
          </ul>
          <div className='d-flex align-items-center'>
              <ThemeToggle
                  isDark={isDark}
                  invertedIconLogic
                  onChange={() => setDark((prev) => !prev)}
              />
              {
                token ? (
                  <div className="nav-item dropdown">
                    <button data-bs-toggle="dropdown" className="nav-item nav-link user-action">
                    <img src="https://www.tutorialrepublic.com/examples/images/avatar/3.jpg" className="avatar" alt="Avatar" />						
                    </button>
                    <div className="dropdown-menu">
                      <Link to='' data-bs-toggle="modal" data-bs-target="#profileModal"  className="dropdown-item"><i className="fa fa-user-o"></i><FiUser /> Profile</Link>
                      <button className="dropdown-item" onClick={handleLogout}><FiLogOut /> Logout</button>
                    </div>
                  </div>                 
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
      <ProfileModal user={user}/>
    </header>
  )
}

export default Header