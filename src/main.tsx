import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { ContentProvider } from './adminPanel/features/contentContext'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ContentProvider>
            <App />
        </ContentProvider>
    </StrictMode>,
)
