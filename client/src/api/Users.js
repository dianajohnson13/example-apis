import { getAccessToken, storeAuth, clearAuth } from '../utils/Auth';

export const checkAuth = async () => {
  const resp = await fetch("/api/auth/refresh_token");
    if (resp.ok) {
        return resp.json()
          .then(data => {
            storeAuth(data);
            return;
          })
      } else {
        clearAuth();
        throw new Error(resp.status)
      }
}

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
      storeAuth({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        userId: data.user.userId
      });
      return data.user;
    });
  } else {
    return resp.json().then(data => {
      throw new Error(data.error || "Something went wrong");
    });
  }
}

export const getUserDetails = async (retries = 0) => {
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
        userId: data.user.userId,
        name: data.user.name,
        email: data.user.email,
        clientId: data.user.clientId
      };
    });
  } else if (resp.status === 403) {
    return checkAuth().then(() => {
      if (retries === 0) {
          return getUserDetails(1)
      }

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
        apiKey: data.apiKey,
      };
    });
  } else if (resp.unauthorized) {
    return checkAuth().then(() => {
      generateAPIKey(user);
    });
  } else {
    return resp.json().then(data => {
      throw new Error(data.error || "Something went wrong");
    });
  }
}


    
