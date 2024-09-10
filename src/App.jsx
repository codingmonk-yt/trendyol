import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from "./pages/dashboard/index";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Admin from "./pages/admin/Home";

export default function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />

      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}
