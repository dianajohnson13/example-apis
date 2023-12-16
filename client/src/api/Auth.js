import { storeAuth, clearAuth } from '../utils/Auth';
import {BASE_URL} from './index';


export const checkAuth = async () => {
    const resp = await fetch(`${BASE_URL}/api/auth/refresh_token`);
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

  export const login = async (user) => {
    const resp = await fetch(`${BASE_URL}/api/auth/login`, {
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

  export const logout = async () => {
    clearAuth();

    const resp = await fetch(`${BASE_URL}/api/auth/refresh_token`, {
      method: 'DELETE',
      headers: {
        "accept": "application/json"
      }
    });

    if (resp.ok) {
      return;
    } else {
      return resp.json().then(data => {
        throw new Error(data.error || "Something went wrong");
      });
    }
  }