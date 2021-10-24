import React, {useState, useEffect, useRef} from "react";
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
      <div className="position-absolute fixed-bottom d-flex">
        <li className="nav-item">
          <button className="btn btn-link nav-link col-2" onClick={() => loginWithRedirect()}>
            <i className="fas fa-fw fa-sign-out-alt"></i>
            <span style={{fontSize: 17}}>
            Log In
            </span>
          </button>
        </li>
      </div>
    )
  };

  const LogoutButton = () => {
    return (
      <div className="position-absolute fixed-bottom d-flex">
        <li className="nav-item">
          <button className="btn btn-link nav-link" onClick={() => logout({returnTo: window.location.origin})}>
            <i className="fas fa-fw fa-sign-out-alt"></i>
            <span style={{fontSize: 17}}>
            Log Out
            </span>
          </button>
        </li>
      </div>
    )
  };

    //toggle navbar display
    const navbarRef = useRef();
    const displayNav = () => {
        const navbar = navbarRef.current;
        if (navbar.className === "navbar-nav bg-success sidebar sidebar-dark fixed-left") {
            navbar.className = "d-none";
        }
        else {
            navbar.className = "navbar-nav bg-success sidebar sidebar-dark fixed-left";
        }
    }
  return (
    <>
        <button className="btn d-flex position-fixed fixed-left" onClick={displayNav} style={{zIndex: "100"}}>
            <i class="fa fa-bars"></i>
        </button>
        <nav className="navbar-nav bg-success sidebar sidebar-dark fixed-left d-none" ref={navbarRef}>
            <div className="position-fixed vh-100">
            <h1 className="sidebar-brand mb-4">My<br/>Book<br/>shelf</h1>
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
                <LogoutButton/>
                </>
                ):(
                <LoginButton/>)
                }
            </div>
        </nav>
    </>
  );
};
 
export default Navbar;