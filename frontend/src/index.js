import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './components/App';

import '../src/assets/dashboard.css'
import '../src/assets/base.css'
import '../src/assets/project.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
  </BrowserRouter>
);


