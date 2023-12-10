
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../api/Users';

export const UserContext = createContext();

export default function UserFetcher({ children, userId }) {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
            getUserDetails()
                .then((user) => {
                   setUser(user);
                })
                .catch((error) => {
                    console.error(error)
                    navigate("/login");
                });
      }, [userId])


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
  }

