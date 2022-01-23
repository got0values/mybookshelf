import React, {useState} from "react";
import NavContent from "./NavContent";

// Toggle navContent
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
        <button className="btn d-flex position-fixed fixed-left" onClick={toggleNav} style={{zIndex: "100"}}>
            <i className={isOpen === true ? 'fas fa-times' : 'fa fa-bars'}></i>
        </button>
        <NavContent isOpen={isOpen}/>
    </>
  );
};
 
export default Navbar;