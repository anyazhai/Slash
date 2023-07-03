import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './components/App';

import { AuthProvider } from './context/AuthProvider';

import '../src/assets/dashboard.css'
import '../src/assets/base.css'
import '../src/assets/project.css'
import '../src/assets/form.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);


