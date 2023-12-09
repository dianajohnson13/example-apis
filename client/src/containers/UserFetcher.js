
import { createContext, useState, useEffect } from 'react';
import { getUserDetails } from '../api/Users';

export const UserContext = createContext();

export default function UserFetcher({ children }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        getUserDetails()
          .then((user) => setUser(user))
          .catch((error) => console.error(error));
      }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
  }

