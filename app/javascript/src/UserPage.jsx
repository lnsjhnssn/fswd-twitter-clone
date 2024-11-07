import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserTweets, deleteTweet } from "./utils/apiRequests";
import "./main.scss";

const UserPage = ({ match }) => {
  const [tweets, setTweets] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("/api/authenticated")
      .then((response) => response.json())
      .then((data) => {
        setCurrentUser(data.username);
      })
      .catch((error) => console.error("Error fetching current user:", error));

    getUserTweets(match.params.username)
      .then((data) => {
        const sortedTweets = data.tweets.sort((a, b) => b.id - a.id);
        setTweets(sortedTweets);
      })
      .catch((error) => console.error("Error fetching user tweets:", error));
  }, [match.params.username]);

  const handleDelete = (tweetId) => {
    deleteTweet(tweetId)
      .then((response) => {
        if (response && response.success) {
          getUserTweets(match.params.username).then((data) => {
            const sortedTweets = data.tweets.sort((a, b) => b.id - a.id);
            setTweets(sortedTweets);
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
    <div>
      <h2>
        Posts by{" "}
        {currentUser === match.params.username ? "me" : match.params.username}
      </h2>
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

export default UserPage;
