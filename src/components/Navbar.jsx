import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext'

const Navbar = () => {
  const navigate = useNavigate()

  const {user, logoutUser} = useAuth()

  const logoutClick = () => {
    logoutUser()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/projects">
          100 Projects
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/projects">
                    All Projects
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/projects/newProject">
                    New Project
                  </Link>
                </li>
                <li className="nav-item">
                <button onClick={logoutClick} className="btn nav-link">Logout</button>
                </li>
              </>
          ):(
            <li className="nav-item">
              <Link className='nav-link'>Login</Link>
            </li>
          )}
            </ul>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;