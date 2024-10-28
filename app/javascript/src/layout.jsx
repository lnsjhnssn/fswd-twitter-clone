import React from "react";
import "./layout.scss";

const Layout = (props) => {
  return (
    <React.Fragment>
      {/* <nav>
        <div>
          <h1>
            <a href="/">TwitterClone</a>
          </h1>

          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/feed">Feed</a>
            </li>
          </ul>
        </div>
      </nav> */}
      <div className="main-container">{props.children}</div>
      <footer>
        <div>
          <span>By LJR</span>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Layout;
