import React, { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "./Logo.jsx";
import SearchForm from "./SearchForm.jsx";
import SignOutButton from "./SignOutButton.jsx";

import "./main.scss";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav>
      <div className="navbar-container">
        <ul className="navbar-list">
          <li>
            <Link to="/">
              <Logo />
            </Link>
          </li>
          <li>
            <SearchForm />
          </li>
          <li>
            <SignOutButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
