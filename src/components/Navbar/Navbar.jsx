import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav className="navbar navbar-expand-lg navbar__transparent ">
      <div className="container position-relative">
        <Link className="navbar-brand " to="/">
          Uber
        </Link>
        <button
          className={`navbar-toggler ${!showMenu && "collapsed"}`}
          type="button"
          aria-expanded={showMenu}
          aria-label="Toggle navigation"
          onClick={() => setShowMenu(!showMenu)}
        >
          <GiHamburgerMenu className="navbar-toggler-icon" />
        </button>
        <div
          className={`collapse navbar-collapse ${showMenu && "show"}`}
          id="navbarSupportedContent"
        >
          <CgClose
            className="icon  close__icon"
            onClick={() => setShowMenu(false)}
          />
          <ul className="navbar-nav  mb-2 mb-lg-0 ">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Signup
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
