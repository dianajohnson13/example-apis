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

export default function App() {
  const userId = getUserId();

  return (
  <Router>
      
        <Header />
        <main className="container">
          <Routes>
              <Route path="/" element={!userId ? <Home /> : <Navigate to={`/home/${userId}`} replace={true}/>}/>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
                <>
                  <Route
                    path="/home/:id"
                    element={<UserFetcher><Dashboard /></UserFetcher>}
                  />
                  <Route
                    path="/settings"
                    element={<UserFetcher><Settings /> </UserFetcher>}
                  />
                </>
          </Routes>
        </main>
   </Router>
  );
}