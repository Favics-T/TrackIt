import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { AppProvider } from './context/AppContext.jsx'
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById('root')).render(
   
  <StrictMode>
    <AppProvider>
   <UserProvider> 
    <App />
</UserProvider>
</AppProvider>
  </StrictMode>
  
)
