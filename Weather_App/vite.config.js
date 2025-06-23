// Weather_App/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  // const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    base: '/', // 👈 very important
  };
});


// import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => {
  
//   // eslint-disable-next-line no-undef
//   const env = loadEnv(mode, process.cwd(), '');

//   return {
//     plugins: [react()],
//     base: env.VITE_BASE_PATH || "/Weather_Reporter",
//   }
// });