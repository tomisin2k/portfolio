import React from 'react'
import Navbar from './components/navbar'
import Hero from './components/hero'
import WorkSection from './components/workSection'

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