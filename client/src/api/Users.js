import { getAccessToken, storeAuth } from '../utils/Auth';

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
      return data.user;
    });
  } else {
    return resp.json().then(data => {
      throw new Error(data.error || "Something went wrong");
    });
  }
}

export const getUserDetails = async (user) => {
  const resp = await fetch("/api/whoami", {
    method: 'GET',
    headers: {
      "content-type": "application/json",
      "accept": "application/json",
      "authorization": `Bearer ${getAccessToken()}`
    }
  });

  if (resp.ok) {
    return resp.json().then(data => {
      return {
        name: data.user.name,
        email: data.user.email,
        clientId: data.user.clientId
      };
    });
  } else {
    return resp.json().then(data => {
      throw new Error(data.error || "Something went wrong");
    });
  }
}

export const generateAPIKey = async (user) => {
  const resp = await fetch("/api/developers", {
    method: 'POST',
    headers: {
      "content-type": "application/json",
      "accept": "application/json",
      "authorization": `Bearer ${getAccessToken()}`
    }
  });

  if (resp.ok) {
    return resp.json().then(data => {
      return {
        clientId: data.clientId,
        apiKey: data.apiKey
      };
    });
  } else {
    return resp.json().then(data => {
      throw new Error(data.error || "Something went wrong");
    });
  }
}