import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test-setup.ts'],
      css: true,
      reporters: ['default'],
      coverage: {
        reportsDirectory: '../../coverage/packages/design-system',
        provider: 'v8',
        reporter: ['text', 'html'],
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/index.ts',
          'src/foundations/**',
          'src/icons/**',
          'src/utils/**',
          'src/styles/**',
          'src/*.d.ts',
        ],
      },
    },
  }),
);
