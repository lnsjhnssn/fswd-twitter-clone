export const authenticate = async () => {
  const response = await fetch("/authenticated", { credentials: "include" });
  return await response.json();
};

export const createUser = async (username, email, password) => {
  const response = await fetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: { username, email, password },
    }),
  });
  return await response.json();
};

export const signInUser = async (username, password) => {
  const response = await fetch("/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      user: { username, password },
    }),
  });
  return await response.json();
};

export const getAllTweets = async () => {
  const response = await fetch("/tweets");
  return await response.json();
};

export const postTweet = async (message, image) => {
  const formData = new FormData();
  if (message) formData.append("tweet[message]", message);
  if (image) formData.append("tweet[image]", image);

  const response = await fetch("/tweets", {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  return await response.json();
};

export const deleteOneTweet = async (id) => {
  const response = await fetch(`/tweets/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return await response.json();
};
