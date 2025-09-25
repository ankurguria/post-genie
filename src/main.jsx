import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './app/root.tsx'; // Assuming root.tsx is the main component
import '../src/index.css'; // Assuming there's a global CSS file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
