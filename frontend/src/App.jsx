import React, { useState, useEffect } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import ParticleCanvas from './components/ParticleCanvas'
import Navigation from './components/Navigation'
import LoadingScreen from './components/LoadingScreen'
//import CV_DATA from '../CV_DATA'

function App() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  const handleScroll = (section) => {
    setActiveSection(section)
    // Scroll to section logic would go here
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="app">
      <ParticleCanvas />
      <Navigation onNavigate={handleScroll} />
      <main>
        <Hero onNavigate={() => handleScroll('home')} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
    </div>
  )
}

export default App