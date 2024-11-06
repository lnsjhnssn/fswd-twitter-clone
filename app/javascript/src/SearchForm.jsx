import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./main.scss";

const SearchForm = () => {
  const [searchUsername, setSearchUsername] = useState("");
  const history = useHistory();

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchUsername.trim()) {
      try {
        console.log("Searching for:", searchUsername);
        const response = await fetch(`/api/users/${searchUsername}`);
        console.log("Response:", response);

        if (response.ok) {
          console.log("User found, navigating...");
          history.push(`/users/${searchUsername}`);
        } else {
          console.log("User not found, redirecting to feed...");
          window.location.replace("/feed");
        }
        setSearchUsername("");
      } catch (error) {
        console.error("Error checking username:", error);
        window.location.replace("/feed");
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchUsername(e.target.value);
  };

  return (
    <div className="form-search">
      <button type="submit" className="icon-button">
        <svg
          fill="none"
          width="22"
          viewBox="0 0 24 24"
          height="22"
          className="search-icon"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-8 6a8 8 0 1 1 14.32 4.906l3.387 3.387a1 1 0 0 1-1.414 1.414l-3.387-3.387A8 8 0 0 1 3 11Z"
          />
        </svg>
      </button>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          value={searchUsername}
          onChange={handleSearchChange}
          placeholder="Search user"
          className="search-input"
        />
      </form>
    </div>
  );
};

export default SearchForm;
