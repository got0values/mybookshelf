import React from "react";
 
// We import bootstrap to make our application look better.
import "startbootstrap-sb-admin-2/css/sb-admin-2.min.css";

import "../styles/style.css";

//import fontawesome icon styles
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <span style={{fontSize: 17}}>
        <button className="btn btn-link nav-link" onClick={() => loginWithRedirect()}>
          <i className="fas fa-fw fa-sign-out-alt"></i>
          Log In
        </button>
      </span>
    </>
  )
};

// Here, we display our Navbar
const Navbar = () => {

  return (
    <nav className="navbar-nav bg-gradient-success sidebar sidebar-dark pl-2" id="sidebar" style={{minWidth: "16rem"}}>
      <div className="position-fixed vh-100">
        <div className="sidebar-brand">
          <h3>MyBookshelf</h3>
        </div>
        <hr className="sidebar-divider my-0"/>
        <li className="nav-item d-flex justify-content-center align-items-center">
          <NavLink className="nav-link" to="/">
            <i className="fas fa-fw fa-list"></i>
            <span style={{fontSize: 17}}>View Books</span>
          </NavLink>
        </li>
        <li className="nav-item d-flex justify-content-center align-items-center">
          <NavLink className="nav-link" to="/create">
            <i className="fas fa-fw fa-book"></i>
            <span style={{fontSize: 17}}>Add Book</span>
          </NavLink>
        </li>
        <hr className="sidebar-divider my-0"/>
        <li className="nav-item d-flex justify-content-center align-items-center"> 
          <LoginButton/>
        </li>
      </div>
    </nav>
  );
};
 
export default Navbar;