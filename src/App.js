import React from 'react'
import WeatherDashboard from './components/weatherDashboard.js'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
        <WeatherDashboard />
    </Router>
  )
}

export default App
