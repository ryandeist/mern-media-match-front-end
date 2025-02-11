// imports
import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import { SettingsProvider } from './contexts/SettingsContext.jsx'
import { UserProvider } from './contexts/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)
