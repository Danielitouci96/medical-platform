import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Fuentes locales (bundled por Vite desde node_modules).
import '@fontsource-variable/geist';
import '@fontsource/libre-caslon-text/400.css';
import '@fontsource/libre-caslon-text/400-italic.css';

// CSS del Design System (tokens + componentes). Obligatorio desde 1.1.0: el
// paquete ya no lo inyecta solo. Debe ir antes que cualquier estilo de la app
// para que los overrides ganen por orden de cascada.
import '@danielitouci96/design-system/styles.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);