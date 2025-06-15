import React from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import WorkSection from './components/WorkSection.jsx'

function App() {
  return (
    <div style={{
      fontFamily: 'Orbitron, monospace',
      backgroundColor: '#000000',
      color: '#ffffff',
      minHeight: '100vh'
    }}>
      <Navbar />
      <Hero />
      <WorkSection />
    </div>
  )
}

export default App