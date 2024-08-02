import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css'

import Dashboard from './pages/Dashboard.tsx'
import LoginPage from './pages/LoginPage.tsx'
import HomeLayout from './layouts/HomeLayout.tsx'
import HomePage from './pages/HomePage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
