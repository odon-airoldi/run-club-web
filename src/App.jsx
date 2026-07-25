import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import WorkoutPage from './pages/WorkoutPage'
import WorkoutCreatePage from './pages/WorkoutCreatePage'
import WorkoutEditPage from './pages/WorkoutEditPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/workout/:id" element={<WorkoutPage />} />
          <Route path="/workout/create" element={<WorkoutCreatePage />} />
          <Route path="/workout/:id/edit" element={<WorkoutEditPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
