import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Layout from "./Layout.jsx";
import Navbar from "./Navbar.jsx";
import UserPage from "./UserPage.jsx";
import { getTweets, createTweet, deleteTweet } from "./utils/apiRequests.js";

import "./main.scss";

const TweetsList = ({ history }) => {
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
        const sortedTweets = data.tweets.sort((a, b) => b.id - a.id);
        setTweets(sortedTweets);
      })
      .catch((error) => console.error("Error fetching tweets:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTweet(newTweet)
      .then(() => {
        getTweets().then((data) => {
          setTweets(data.tweets);
        });
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
          getTweets().then((data) => {
            setTweets(data.tweets);
          });
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
    <div className="feed-container">
      <div className="form-create-tweet">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTweet}
            onChange={handleTweetChange}
            placeholder={`What's up, ${currentUser}?`}
          />
          <button className="btn-post" type="submit">
            Post
          </button>
        </form>
      </div>
      <div className="posts-container">
        {tweets.map((tweet) => (
          <div className="tweet-post" key={tweet.id}>
            <div className="tweet-post-header">
              <div>
                <strong className="username-link">
                  <Link to={`/users/${tweet.username}`}>{tweet.username}</Link>
                </strong>
              </div>
              <div>
                <p>
                  <strong>
                    {currentUser === tweet.username && (
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(tweet.id)}
                      >
                        <span>Delete</span>
                      </button>
                    )}
                  </strong>
                </p>
              </div>
            </div>
            <p>{tweet.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Navbar />
        <Switch>
          <Route path="/users/:username" component={UserPage} />
          <Route path="/" render={(props) => <TweetsList {...props} />} />
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
