import { BASE_URL } from '.';
import { getAccessToken } from '../utils/Auth';
import { checkAuth } from './Auth';

export const signup = async (newUser) => {
    const resp = await fetch(`${BASE_URL}/api/users`, {
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

export const getUserDetails = async (retries = 0) => {
  const resp = await fetch(`${BASE_URL}/api/whoami`, {
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
