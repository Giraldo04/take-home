import { defineConfig } from 'astro/config';

// Sitio estático: los productos se obtienen en build time y el carrito
// vive en el cliente. No necesitamos adaptador de SSR.
//
// server.host/port aplican también a `astro preview`, que sirve dist/ en
// producción (Railway). Leemos PORT del entorno que Railway inyecta.
export default defineConfig({
  output: 'static',
  server: {
    host: true,
    port: Number(process.env.PORT) || 4321,
  },
  // El preview de Astro (Vite) bloquea hosts desconocidos. Autorizamos los
  // dominios de Railway para que el sitio sea accesible públicamente.
  vite: {
    preview: {
      allowedHosts: ['.railway.app'],
    },
  },
});
