import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loader from './components/Loader'
import Navigation from './components/Navigation'
import HeroParallaxDemo from './pages/HeroParallax'
import DualCarousel from './pages/DualCarousel'
import Features from './pages/Features'
import Testimonials from './pages/Testimnonials'
import MeetCurrentUsers from './pages/MeetCurrentUsers'
import Testi from './pages/Testi'

function App() {
  const [showLoader, setShowLoader] = useState(true)

  const handleLoaderComplete = () => {
    setShowLoader(false)
  }

  if (showLoader) {
    return <Loader onComplete={handleLoaderComplete} />
  }

  return (
    <Router>
      <div className="bg-black min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<HeroParallaxDemo />} />
          <Route path="/dual-carousel" element={<DualCarousel />} />
          <Route path="/features" element={<Features />} />
          <Route path="/testimonials" element={<Testi />} />
          <Route path="/meet-current-users" element={<MeetCurrentUsers />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
