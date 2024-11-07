import React from "react";
import { Link } from "react-router-dom";

import Logo from "./Logo.jsx";
import SearchForm from "./SearchForm";
import SignOutButton from "./SignOutButton";

import "./main.scss";

const Navbar = () => (
  <nav>
    <div>
      <ul>
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

export default Navbar;
