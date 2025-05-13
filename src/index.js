import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create root element
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);