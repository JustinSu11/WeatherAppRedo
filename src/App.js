import React from 'react'
import WeatherDashboard from './components/WeatherDashboard'
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
