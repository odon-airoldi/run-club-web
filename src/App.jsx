import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { WorkoutProvider } from './contexts/WorkoutContext'
import { UserProvider } from './contexts/UserContext'
import IndexPage from './pages/IndexPage'
import WorkoutsPage from './pages/WorkoutsPage'
import WorkoutPage from './pages/WorkoutPage'
import WorkoutCreatePage from './pages/WorkoutCreatePage'
import WorkoutEditPage from './pages/WorkoutEditPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserPage from './pages/UserPage'
import AppLayout from './layouts/AppLayout'
import UsersPage from './pages/UsersPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <WorkoutProvider>
              <Routes>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<IndexPage />} />
                  <Route path="/workouts" element={<WorkoutsPage />} />
                  <Route path="/workout/:id" element={<WorkoutPage />} />
                  <Route path="/workout/create" element={<WorkoutCreatePage />} />
                  <Route path="/workout/:id/edit" element={<WorkoutEditPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                  <Route path="/users/:id" element={<UserPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/*" element={<IndexPage />} />
                </Route>
              </Routes>
            </WorkoutProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter >
    </>
  )
}

export default App
