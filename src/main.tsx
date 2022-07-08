import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Index from '.'
import Header from './Header'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <>
                <Header />
                <Index />
            </>
        </BrowserRouter>
    </React.StrictMode>
)
