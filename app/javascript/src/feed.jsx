import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Layout from "./layout";

const SubRoute = ({ match }) => <p>{match.url}</p>;

const Demo = () => (
  <Router>
    <Layout>
      <h1>Feed</h1>
      <ul>
        <li>
          <Link to="/feed/a">Link A</Link>
        </li>
        <li>
          <Link to="/feed/b">Link B</Link>
        </li>
        <li>
          <Link to="/feed/c">Link C</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/feed/a" exact component={SubRoute} />
        <Route path="/feed/b" exact component={SubRoute} />
        <Route path="/feed/c" exact component={SubRoute} />
      </Switch>
    </Layout>
  </Router>
);

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Demo />,
    document.body.appendChild(document.createElement("div"))
  );
});
