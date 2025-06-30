import React from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import WorkSection from './components/WorkSection.jsx'
import Testimonial from './components/Testimonial.jsx'

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
      <Testimonial />
    </div>
  )
}

export default App