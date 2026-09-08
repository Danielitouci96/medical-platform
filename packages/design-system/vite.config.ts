import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { peerDependencies, dependencies } from './package.json';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, '../../dist/packages/design-system'),
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MedicalDesignSystem',
      formats: ['es'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // Externalize dependencies and peer dependencies so they are not bundled
      external: [
        ...Object.keys(peerDependencies),
        ...Object.keys(dependencies).filter(
          (dep) =>
            dep.startsWith('react') ||
            dep === 'react-dom' ||
            dep.startsWith('@radix-ui'),
        ),
        /^react\/.*/,
        /^react-dom\/.*/,
        /^@radix-ui\/.*/,
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.scss')) {
            return 'styles/[name][extname]';
          }
          return assetInfo.name ?? '';
        },
      },
    },
    cssCodeSplit: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
