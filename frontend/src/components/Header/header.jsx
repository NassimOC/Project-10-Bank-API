import logo from "../../assets/argentBankLogo.png";
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom'


const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    setIsAuthenticated(false)
    navigate('/')
  };

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {
          isAuthenticated ? (
            <NavLink className="main-nav-item" to="/" onClick={handleLogout}>
              <i className="fa fa-user-circle"></i>
              Sign Out
            </NavLink>
          ) : (
            <NavLink className="main-nav-item" to="/login">
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
          )
        }
      </div>
    </nav>
  )
}

export default Header