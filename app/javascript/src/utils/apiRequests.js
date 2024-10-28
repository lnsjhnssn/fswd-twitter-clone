import { safeCredentials, handleErrors } from "./fetchHelper";

//*** Handle Authentication And Sessions***//

// Create User
export const createUser = (username, email, password) => {
  return fetch(
    "/api/users",
    safeCredentials({
      method: "POST",
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password,
        },
      }),
    })
  )
    .then(handleErrors)
    .then((res) => {
      console.log("User created successfully:", res);
      return res;
    })
    .catch((error) => {
      console.error("Error during sign up:", error);
    });
};

// Sign In User
export const signInUser = (username, password) => {
  return fetch(
    "/api/sessions",
    safeCredentials({
      method: "POST",
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    })
  )
    .then(handleErrors)
    .then((res) => {
      console.log("Login successful:", res);
      return res;
    })
    .catch((error) => {
      console.error("Error during sign in:", error);
    });
};

// Sign Out User
export const signOutUser = () => {
  return fetch(
    "/api/sessions",
    safeCredentials({
      method: "DELETE",
    })
  )
    .then(handleErrors)
    .then((res) => {
      console.log("Logout successful:", res);
      return res;
    })
    .catch((error) => {
      console.error("Error during sign out:", error);
    });
};

//*** Handle Tweets ***//

// Create Tweet
export const createTweet = (message) => {
  return fetch(
    "/api/tweets",
    safeCredentials({
      method: "POST",
      body: JSON.stringify({
        message: message,
      }),
    })
  )
    .then(handleErrors)
    .then((res) => {
      console.log("Tweet created successfully:", res);
      return res;
    })
    .catch((error) => {
      console.error("Error creating tweet:", error);
    });
};

// Delete Tweet
export const deleteTweet = (id) => {
  return fetch(
    `/api/tweets/${id}`,
    safeCredentials({
      method: "DELETE",
    })
  )
    .then(handleErrors)
    .then((res) => {
      console.log("Tweet deleted successfully:", res);
      return { success: true, id }; // Return an object with success status and the deleted tweet's id
    })
    .catch((error) => {
      console.error("Error deleting tweet:", error);
      throw error; // Make sure to throw the error so it can be caught in the component
    });
};

// Get All Tweets
export const getTweets = () => {
  return fetch(
    "/api/tweets",
    safeCredentials({
      method: "GET",
    })
  )
    .then(handleErrors)
    .then((res) => {
      console.log("Tweets fetched successfully:", res);
      return res;
    })
    .catch((error) => {
      console.error("Error fetching tweets:", error);
    });
};

// Get Specific User Tweets
export const getUserTweets = (username) => {
  return fetch(
    `/api/users/${username}/tweets`,
    safeCredentials({
      method: "GET",
    })
  )
    .then(handleErrors)
    .then((res) => {
      console.log("User tweets fetched successfully:", res);
      return res;
    })
    .catch((error) => {
      console.error("Error fetching user tweets:", error);
    });
};

// Search Tweets By Keyword
export const searchTweets = (keyword) => {
  return fetch(
    `/api/tweets/search/${keyword}`,
    safeCredentials({
      method: "GET",
    })
  )
    .then(handleErrors)
    .then((res) => {
      console.log("Tweet search completed successfully:", res);
      return res;
    })
    .catch((error) => {
      console.error("Error searching tweets:", error);
    });
};
