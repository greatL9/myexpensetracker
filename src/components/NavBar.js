import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const userIsLoggedIn = JSON.parse(sessionStorage.getItem('userInfo'));

  const navigate = useNavigate();

  const logoutHandler = () => {
    sessionStorage.removeItem('userInfo');
    navigate('/');
  };

  return (
    <div>
      {userIsLoggedIn ? (
        <>
          {' '}
          <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <div className="container-fluid">
              <Link to="/" className="navbar-brand">
                logo
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
              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarNav"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/AddExpense" className="nav-link">
                      AddExpense
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/AllExpense" className="nav-link">
                      AllExpense
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button onClick={logoutHandler}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      ) : (
        <>
          {' '}
          <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <div className="container-fluid">
              <Link to="/" className="navbar-brand">
                logo
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
              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarNav"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      to="/register"
                      className="nav-link active"
                      aria-current="page"
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/Login"
                      className="nav-link active"
                      aria-current="page"
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
