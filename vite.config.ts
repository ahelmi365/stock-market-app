import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const isTest = process.env.NODE_ENV === 'test';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  ...(isTest && {
    test: {
      environment: 'happy-dom',
    },
  }),
});