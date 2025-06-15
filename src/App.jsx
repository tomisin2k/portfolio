import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WorkSection from './components/WorkSection'

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