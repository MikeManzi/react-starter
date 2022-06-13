import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path='*' element={<div>---Page not found</div>} />
      </Routes>
    </div>
  )
}

export default App
