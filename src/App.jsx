import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import ResourcesPage from './pages/ResourcesPage/ResourcesPage';

function App() {

  return (
    <Router>    
       <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="/resources" element={<ResourcesPage />} />
       </Routes>
    </Router>
  )
}

export default App
