import React from "react";

const Layout = (props) => {
  return (
    <React.Fragment>
      <nav>
        <div>
          <a href="#">TwitterClone</a>
          <div>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/feed">Feed</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>{props.children}</div>
      <footer>
        <div>
          <span>By LJR</span>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Layout;
