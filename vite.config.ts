import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          '@loadable/babel-plugin'
        ]
      }
    }),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|webp)$/i,
      includePublic: true,
      logStats: true,
      ansiColors: true,
      png: {
        quality: 80,
        progressive: true,
      },
      jpeg: {
        quality: 80,
        progressive: true,
      },
      jpg: {
        quality: 80,
        progressive: true,
      },
      webp: {
        lossless: false,
        quality: 80,
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react'],
          'date-vendor': ['date-fns'],
          'tone-vendor': ['tone'],
          'loadable-vendor': ['@loadable/component'],
          'intersection-observer': ['react-intersection-observer'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true,
    modulePreload: true,
    reportCompressedSize: false,
    sourcemap: false,
  },
  server: {
    host: 'localhost',
    port: 5173,
    open: true,
    hmr: {
      clientPort: 443
    }
  }
});