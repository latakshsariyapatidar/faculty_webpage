import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import FacultyPageWrapper from './components/FacultyPageWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Redirect root to a placeholder or show error */}
        <Route path="/" element={
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textAlign: 'center',
            padding: '2rem'
          }}>
            <div>
              <h1 style={{ color: '#89288f', marginBottom: '1rem' }}>Faculty Webpage</h1>
              <p style={{ color: '#666' }}>Please access the page with a valid faculty ID</p>
              <p style={{ color: '#999', fontSize: '0.9rem' }}>Example: /faculty123</p>
            </div>
          </div>
        } />
        
        {/* Dynamic route for faculty pages */}
        <Route path="/:facultyId" element={<FacultyPageWrapper />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


