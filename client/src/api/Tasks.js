import { BASE_URL } from '.';
import { getAccessToken } from '../utils/Auth';
import { checkAuth } from './Auth';

export const getUserTasks = async (retries = 0) => {
    const resp = await fetch(`${BASE_URL}/api/tasks`, {
      method: 'GET',
      headers: {
        "authorization": `Bearer ${getAccessToken()}`
      }
    });
    if (resp.ok) {
  
      return resp.json().then(data => {
        return data;
      });
    } else if (resp.status === 403) {
      return checkAuth().then(() => {
        if (retries === 0) {
            return getUserTasks(1)
        }
  
      });
    } else {
      return resp.json().then(data => {
        throw new Error(data.error || "Something went wrong");
      });
    }
  }

  export const createTask = async (task, retries = 0) => {
    const resp = await fetch(`${BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        "authorization": `Bearer ${getAccessToken()}`,
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(task)
    });
  
    if (resp.ok) {
      return resp.json();
    } else if (resp.unauthorized) {
      return checkAuth().then(() => {
        createTask(task);
      });
    } else {
      return resp.json().then(data => {
        throw new Error(data.error || "Something went wrong");
      });
    }
  }