import React from "react";
import Footer from "./Footer";
import "./main.scss";

const Layout = (props) => {
  return (
    <React.Fragment>
      <div className="layout-container">
        <div className="main-container">{props.children}</div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Layout;
