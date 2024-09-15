// src/components/TweetFeed.js
import React, { useState, useEffect } from "react";
import { getAllTweets, deleteOneTweet } from "../api";

const TweetFeed = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    getAllTweets().then((data) => setTweets(data.tweets));
  }, []);

  const handleDeleteTweet = async (id) => {
    await deleteOneTweet(id);
    setTweets(tweets.filter((tweet) => tweet.id !== id));
  };

  return (
    <div>
      {tweets.map((tweet) => (
        <div key={tweet.id}>
          <h3>{tweet.username}</h3>
          <p>{tweet.message}</p>
          {tweet.image && <img src={tweet.image} alt="Tweet" />}
          <button onClick={() => handleDeleteTweet(tweet.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TweetFeed;
