import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.jsx"
import Statistics from "./pages/Statistics.jsx"
import Navbar from "./components/Navbar.jsx";
function App() {
  return (
    <>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
