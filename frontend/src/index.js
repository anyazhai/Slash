import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './components/App';

import { AuthProvider } from './context/AuthProvider';
import { ColumnProvider } from './context/ColumnContext';

import './assets/dashboard.css';
import './assets/base.css';
import './assets/project.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ColumnProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </ColumnProvider>
    </AuthProvider>
  </BrowserRouter>,
);
