import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './pages/Home';
import Signup from './pages/Signup';


export default function App() {
  return (
  <Router>
      <div className="App">
        <header>
          {/* logo placeholder */}
          <div>
            <strong>Example APIs</strong>
          </div>
        </header>
        <main>
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/signup" element={<Signup />} />
              
          </Routes>
        </main>
      </div>
   </Router>
  );
}