import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { JobProvider } from './context/JobContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JobProvider>
      <App />
    </JobProvider>  
  </StrictMode>,
)
