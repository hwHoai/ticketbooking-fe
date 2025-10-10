import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Icons from 'unplugin-icons/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
      // Có thể custom prefix nếu muốn
      autoInstall: true
    })
  ]
});
