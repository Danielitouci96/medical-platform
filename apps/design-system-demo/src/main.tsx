import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Fuentes locales (bundled por Vite desde node_modules).
import '@fontsource-variable/geist';
import '@fontsource/libre-caslon-text/400.css';
import '@fontsource/libre-caslon-text/400-italic.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);