import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '');


  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH || "/Weather_Reporter",
  }
})



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: import.meta.env.VITE_BASE_PATH || "/Weather_Reporter",

// })
