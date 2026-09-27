import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The demo app resolves @danielitouci96/design-system through tsconfig paths.
// Vite uses the `main`/`exports` fields of the workspace package, which point
// at the raw source (src/index.ts) — this keeps us in dev-mode parity with how
// consumers will import the library.
export default defineConfig({
  root: __dirname,
  plugins: [react()],
  resolve: {
    alias: {
      // Los subpaths se importan por separado: "@danielitouci96/design-system/themes/onco.css"
      // y "@danielitouci96/design-system/styles.css". Apuntan al SCSS fuente para que
      // siga habiendo HMR sobre la hoja de estilos, sin depender de un
      // `npm run build` previo.
      // Las claves largas van primero: Vite coincide en orden de inserción, así
      // que si no, la clave del paquete pelado se las tragaría.
      '@danielitouci96/design-system/styles.css': new URL('../../packages/design-system/src/styles/index.scss', import.meta.url).pathname,
      '@danielitouci96/design-system/themes': new URL('../../packages/design-system/themes/', import.meta.url).pathname,
      '@danielitouci96/design-system': new URL('../../packages/design-system/src/index.ts', import.meta.url).pathname,
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