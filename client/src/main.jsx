import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './components/screens/home/Home.jsx'
import './assets/styles/index.scss'
import { RouterProvider } from 'react-router-dom'
import Router from './routes/Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>
)
