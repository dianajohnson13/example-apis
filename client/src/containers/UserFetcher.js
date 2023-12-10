
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../api/Users';
import { getUserId } from '../utils/Auth';

export const UserContext = createContext();

export default function UserFetcher({ children }) {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
            getUserDetails()
                .then((user) => {
                   setUser(user);
                })
                .catch((error) => {
                    console.error(error)
                    navigate("/login");
                });
        }

        const checkStorageForUser = () => {
            const idInStorage = getUserId();
            if (!idInStorage) {
                navigate("/login");
            } else if (!user || user.userId !== idInStorage) {
                checkUser();
            }
        }

        checkStorageForUser();

        window.addEventListener('storage', checkStorageForUser);

        return () => window.removeEventListener('storage', checkStorageForUser())
      }, [])


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
  }

