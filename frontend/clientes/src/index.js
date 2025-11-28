import React from 'react';
import ReactDOM from 'react-dom/client';
import HealthCheck from './components/layout/HealthCheck.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HealthCheck />
  </React.StrictMode>
);
