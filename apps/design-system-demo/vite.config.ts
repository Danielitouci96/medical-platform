import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The demo app resolves @medical/design-system through tsconfig paths.
// Vite uses the `main`/`exports` fields of the workspace package, which point
// at the raw source (src/index.ts) — this keeps us in dev-mode parity with how
// consumers will import the library.
export default defineConfig({
  root: __dirname,
  plugins: [react()],
  resolve: {
    alias: {
      // Los temas se importan por subpath: "@medical/design-system/themes/onco.css".
      // El alias largo va primero (Vite ordena por longitud de la clave).
      '@medical/design-system/themes': new URL('../../packages/design-system/themes/', import.meta.url).pathname,
      '@medical/design-system': new URL('../../packages/design-system/src/index.ts', import.meta.url).pathname,
    },
  },
  server: {
    port: 4401,
    open: false,
  },
  preview: {
    port: 4401,
  },
  build: {
    outDir: '../../dist/apps/design-system-demo',
    emptyOutDir: true,
  },
});