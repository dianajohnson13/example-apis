import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

import Header from './components/Header'


export default function App() {
  return (
  <Router>
      <>
        <Header />
        <main className="container">
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </>
   </Router>
  );
}