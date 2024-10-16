import { safeCredentials, handleErrors } from "./fetchHelper";

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
