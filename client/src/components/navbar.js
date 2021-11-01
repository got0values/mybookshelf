import React, {useState, useEffect, useRef} from "react";
import "startbootstrap-sb-admin-2/css/sb-admin-2.min.css";
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
          <i className="fas fa-fw fa-book-open"></i>
          <span style={{fontSize: 17}}>Add Book</span>
        </NavLink>
      </li>
    )
  }

  const BookLists = () => {
    return (
      <li className="nav-item d-flex justify-content-center align-items-center">
        <NavLink className="nav-link" to="/booklists">
          <i className="fas fa-fw fa-file-alt"></i>
          <span style={{fontSize: 17}}>Book Lists</span>
        </NavLink>
      </li>
    )
  }

  const CreateListButton = () => {
    return (
      <li className="nav-item d-flex justify-content-center align-items-center">
        <NavLink className="nav-link" to="/createlist">
          <i className="fas fa-fw fa-list-alt"></i>
          <span style={{fontSize: 17}}>Create List</span>
        </NavLink>
      </li>
    )
  }

  const LoginButton = () => {
    return (
      <div className="position-absolute fixed-bottom d-flex">
        <li className="nav-item">
          <button className="btn btn-link nav-link" onClick={() => loginWithRedirect()}>
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
      <div className="position-absolute fixed-bottom d-flex mb-2">
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
    const hamburgerX = useRef();
    const displayNav = () => {
        const navbar = navbarRef.current;
        const hamburger = hamburgerX.current;
        if (navbar.className === "navbar-nav shadow sidebar sidebar-light fixed-left") {
            navbar.className = "d-none";
            hamburger.className = "fa fa-bars";
        }
        else {
            navbar.className = "navbar-nav shadow sidebar sidebar-light fixed-left";
            hamburger.className = "fas fa-times";
        }
    }
    
  return (
    <>
        <button className="btn d-flex position-fixed fixed-left" onClick={displayNav} style={{zIndex: "100"}}>
            <i className="fas fa-times" ref={hamburgerX}></i>
        </button>
        <nav className="navbar-nav shadow sidebar sidebar-light fixed-left" ref={navbarRef}>
            <div className="position-fixed vh-100">
                <div className="row justify-content-center">                
                    <img src="mybookshelflogo.png" alt="mybookshelf logo" className="img-fluid" style={{maxWidth: "100px"}}/>
                </div>
                <hr className="sidebar-divider my-0"/>
                <li className="nav-item d-flex justify-content-center align-items-center">
                    <NavLink className="nav-link" to="/">
                        <i className="fas fa-fw fa-list"></i>
                    <span style={{fontSize: 17}}>Bookshelf</span>
                    </NavLink>
                </li>
                    {myUser ? (
                    <>
                    <AddBookButton/>
                    <BookLists/>
                    <CreateListButton/>
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