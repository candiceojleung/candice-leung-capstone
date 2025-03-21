import './App.scss'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import ResourcesPage from './pages/ResourcesPage/ResourcesPage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {

  return (
    <Router>
      <Header />
       <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="/resources" element={<ResourcesPage />} />
       </Routes>
       <Footer/>
    </Router>
  )
}

export default App
