import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import WorkoutPage from './pages/WorkoutPage'
import WorkoutCreatePage from './pages/WorkoutCreatePage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/workout/:id" element={<WorkoutPage />} />
          <Route path="/workout/create" element={<WorkoutCreatePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
