import { BASE_URL } from '.';
import { getAccessToken } from '../utils/Auth';
import { checkAuth } from './Auth';

export const generateAPIKey = async (user) => {
    const resp = await fetch(`${BASE_URL}/api/developers`, {
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
  
  export const deleteAPIKey = async (clientId) => {
    const resp = await fetch(`${BASE_URL}/api/developers?clientId=${clientId}`, {
      method: "DELETE",
      headers: {
        "accept": "application/json",
        "authorization": `Bearer ${getAccessToken()}`
      }
    })
  
    if (resp.ok) {
      return;
    } else if (resp.unauthorized) {
      return checkAuth().then(() => {
        deleteAPIKey();
      });
    } else {
      return resp.json().then(data => {
        throw new Error(data.error || "Something went wrong");
      });
    }
  }
  