import React, {useState, useEffect} from "react";
import "startbootstrap-sb-admin-2/css/sb-admin-2.min.css";
// import "../styles/style.css";
//import fontawesome icon styles
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
//import auth0 for login
import { useAuth0 } from "@auth0/auth0-react";

// Here, we display our Navbar
const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [myUser, setMyUser] = useState(null);

  useEffect(()=>{
    if (isAuthenticated) {
      setMyUser(user);
    }
    else {
      setMyUser(false);
    }
  }, [isAuthenticated])

  const AddBookButton = () => {
    return (
      <li className="nav-item d-flex justify-content-center align-items-center">
        <NavLink className="nav-link" to="/create">
          <i className="fas fa-fw fa-book"></i>
          <span style={{fontSize: 17}}>Add Book</span>
        </NavLink>
      </li>
    )
  }

  const LoginButton = () => {
    return (
      <li className="nav-item d-flex justify-content-center align-items-center">
        <button className="btn btn-link nav-link " onClick={() => loginWithRedirect()}>
          <i className="fas fa-fw fa-sign-out-alt"></i>
          <span style={{fontSize: 17}}>
          Log In
          </span>
        </button>
      </li>
    )
  };

  const LogoutButton = () => {
    return (
      <li className="nav-item d-flex justify-content-center align-items-center">
        <button className="btn btn-link nav-link " onClick={() => logout({returnTo: window.location.origin})}>
          <i className="fas fa-fw fa-sign-out-alt"></i>
          <span style={{fontSize: 17}}>
          Log Out
          </span>
        </button>
      </li>
    )
  };

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
        
        
          {myUser ? (
          <>
            <AddBookButton/>
            <hr className="sidebar-divider my-0"/>
            <LogoutButton/>
          </>
          ):(
          <LoginButton/>)
          }
      </div>
    </nav>
  );
};
 
export default Navbar;