import { storeAuth } from '../utils/Auth';

export const signup = async (newUser) => {
    const resp = await fetch("/api/users", {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(newUser)
    });

    if (resp.ok) {
      return resp.json();
    } else {
      return resp.json().then(data => {
        throw new Error(data.error || "Something went wrong");
      });
    }
}

export const login = async (user) => {
  const resp = await fetch("/api/auth/login", {
    method: 'POST',
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(user)
  });

  if (resp.ok) {
    return resp.json().then(data => {
      storeAuth(data);
      return;
    });
  } else {
    return resp.json().then(data => {
      throw new Error(data.error || "Something went wrong");
    });
  }
}
