import React from 'react'
import ReactDOM from 'react-dom/client'
import '@endo/eventual-send/shim.js'; // adds support needed by E
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
