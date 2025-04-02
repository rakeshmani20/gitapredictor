import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Quiz from './Quiz'
import Results from './Results'

function Home() {
  const navigate = useNavigate();

  return (
    <main className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">
          Which Bhagavad Gita quote matches your personality?
        </h1>
        <button className="hero-button" onClick={() => navigate('/quiz')}>
          Find out now!
        </button>
      </div>
      <img 
        src="/gitaheader.png"
        alt="Krishna and Arjuna in chariot" 
        className="hero-image"
      />
    </main>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  )
}

export default App
