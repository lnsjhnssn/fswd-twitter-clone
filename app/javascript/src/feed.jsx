import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Layout from "./layout";
import {
  getTweets,
  createTweet,
  deleteTweet,
  signOutUser,
} from "./utils/apiRequests";
import "./feed.scss";

const TweetsList = () => {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("/api/authenticated")
      .then((response) => response.json())
      .then((data) => {
        setCurrentUser(data.username);
      })
      .catch((error) => console.error("Error fetching current user:", error));

    getTweets()
      .then((data) => {
        // Sort tweets by id in descending order
        const sortedTweets = data.tweets.sort((a, b) => b.id - a.id);
        setTweets(sortedTweets);
      })
      .catch((error) => console.error("Error fetching tweets:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    createTweet(newTweet)
      .then((data) => {
        // Add new tweet to the beginning of the array
        setTweets([data.tweet, ...tweets]);
        setNewTweet("");
      })
      .catch((error) => console.error("Error posting tweet:", error));
  };

  const handleTweetChange = (e) => {
    setNewTweet(e.target.value);
  };

  const handleDelete = (tweetId) => {
    deleteTweet(tweetId)
      .then((response) => {
        if (response && response.success) {
          setTweets((prevTweets) =>
            prevTweets.filter((tweet) => tweet.id !== tweetId)
          );
        } else {
          console.error("Delete response was not successful");
        }
      })
      .catch((error) => {
        console.error("Error deleting tweet:", error);
        alert("Failed to delete tweet");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTweet}
          onChange={handleTweetChange}
          placeholder="New tweet"
        />
        <button type="submit">Post</button>
      </form>
      <h3>All Tweets</h3>
      {tweets.map((tweet) => (
        <div className="tweet-wrapper" key={tweet.id}>
          {/* Add keys to child elements that are part of lists */}
          <p key={`username-${tweet.id}`}>
            <strong>{tweet.username}</strong>
          </p>
          <p key={`message-${tweet.id}`}>{tweet.message}</p>
          {currentUser === tweet.username && (
            <button
              key={`delete-${tweet.id}`}
              className="btn-delete"
              onClick={() => handleDelete(tweet.id)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const SubRoute = ({ match }) => <p>{match.url}</p>;

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/authenticated")
      .then((response) => response.json())
      .then((data) => {
        setIsAuthenticated(!!data.username);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error checking auth status:", error);
        setIsLoading(false);
        setIsAuthenticated(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const App = () => {
  const handleLogout = () => {
    signOutUser()
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => console.error("Error signing out:", error));
  };

  return (
    <Router>
      <Layout>
        <div className="header-actions">
          <h2>Feeds</h2>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
        <ul>
          <li>
            <Link to="/tweets">Get /tweets</Link>
          </li>
          <li>
            <Link to="/tweets">Post /tweets</Link>
          </li>
          <li>
            <Link to="/tweets/:id">Delete /tweets/:id</Link>
          </li>
          <li>
            <Link to="/users/:username/tweets">
              Get /users/:username/tweets
            </Link>
          </li>
          <li>
            <Link to="/tweets/search/:keyword">
              Get /tweets/search/:keyword
            </Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute path="/tweets" exact component={TweetsList} />
          <PrivateRoute path="/tweets/:id" exact component={SubRoute} />
          <PrivateRoute
            path="/users/:username/tweets"
            exact
            component={SubRoute}
          />
          <PrivateRoute
            path="/tweets/search/:keyword"
            exact
            component={SubRoute}
          />
        </Switch>
      </Layout>
    </Router>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});
