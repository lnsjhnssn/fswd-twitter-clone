// src/App.js
import React from "react";
import AuthRedirect from "./components/AuthRedirect";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import TweetFeed from "./components/TweetFeed";
import PostTweet from "./components/PostTweet";

const App = () => {
  return (
    <div>
      <AuthRedirect />

      <SignUp />
      <LogIn />
      <PostTweet />
      <TweetFeed />
    </div>
  );
};

export default App;
