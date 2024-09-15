import React from "react";

const ProfileCard = ({ username }) => (
  <div>
    <h2>{username}</h2>
    <p>@{username}</p>
  </div>
);

export default ProfileCard;
