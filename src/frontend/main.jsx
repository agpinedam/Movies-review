import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Página de inicio

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
    </BrowserRouter>
);
