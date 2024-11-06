import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import "./main.scss";
import SignOutButton from "./SignOutButton";
import Logo from "./Logo.jsx";

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
