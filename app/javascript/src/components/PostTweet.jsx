// src/components/PostTweet.js
import React, { useState } from "react";
import { postTweet } from "../api";

const PostTweet = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const handlePostTweet = async () => {
    await postTweet(message, image);
    setMessage("");
    setImage(null);
    // Optionally reload feed after posting
  };

  return (
    <div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="What's happening?"
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handlePostTweet}>Tweet</button>
    </div>
  );
};

export default PostTweet;
