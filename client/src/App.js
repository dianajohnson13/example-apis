import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

import Header from './components/Header';
import { getUserId } from "./utils/Auth";
import UserFetcher from "./containers/UserFetcher";

export const authUpdate = new Event("authUpdate");

export default function App() {
  const [userId, setUserId] = useState(getUserId());

  useEffect(() => {
    const checkStorageForUser = () => {
        setUserId(getUserId())
    }
    checkStorageForUser();

    window.addEventListener('authUpdate', checkStorageForUser);

    return () => window.removeEventListener('authUpdate', checkStorageForUser)
  }, [])

  return (
  <Router>
        <Header isLoggedIn={userId} />
        <main className="container">
          <Routes>
              <Route path="/" element={!userId ? <Home /> : <Navigate to={`/home/${userId}`} replace={true}/>}/>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
                <>
                  <Route
                    path="/home/:id"
                    element={<UserFetcher userId={userId}><Dashboard /></UserFetcher>}
                  />
                  <Route
                    path="/settings"
                    element={<UserFetcher userId={userId}><Settings /> </UserFetcher>}
                  />
                </>
          </Routes>
        </main>
   </Router>
  );
}