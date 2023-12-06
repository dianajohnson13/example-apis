import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';


export default function App() {
  return (
  <Router>
      <>
        <header>
          <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
            <div class="container">
              <a href="#" class="navbar-brand">Taskerly</a>
              
            </div>
          </nav>
        </header>
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