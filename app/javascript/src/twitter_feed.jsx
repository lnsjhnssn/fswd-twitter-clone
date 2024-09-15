import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./twitter_feed.scss";

const csrfToken = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute("content");

const TwitterFeed = () => {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const response = await fetch("/api/tweets");
      if (response.ok) {
        const data = await response.json();
        setTweets(data);
      } else {
        setError("Failed to fetch tweets.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handlePostTweet = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ tweet: { content: newTweet } }),
      });
      if (response.ok) {
        setNewTweet("");
        fetchTweets(); // Refresh tweets after posting
      } else {
        setError("Failed to post tweet.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleDeleteTweet = async (id) => {
    try {
      const response = await fetch(`/api/tweets/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });
      if (response.ok) {
        fetchTweets(); // Refresh tweets after deleting
      } else {
        setError("Failed to delete tweet.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/tweets/search/${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setTweets(data);
      } else {
        setError("Failed to search tweets.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="feed-container">
      <h1>Twitter Feed</h1>
      {error && <p className="error">{error}</p>}
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tweets..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <form onSubmit={handlePostTweet}>
        <textarea
          value={newTweet}
          onChange={(e) => setNewTweet(e.target.value)}
          placeholder="What's happening?"
          required
        />
        <button type="submit">Post Tweet</button>
      </form>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id}>
            <p>{tweet.content}</p>
            <button onClick={() => handleDeleteTweet(tweet.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <TwitterFeed />,
    document.body.appendChild(document.createElement("div"))
  );
});

export default TwitterFeed;
