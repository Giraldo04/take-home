import { defineConfig } from 'astro/config';

// Sitio estático: los productos se obtienen en build time y el carrito
// vive en el cliente. No necesitamos adaptador de SSR.
//
// En producción (Railway) NO usamos `astro preview` porque su servidor (Vite)
// bloquea hosts desconocidos. Servimos dist/ con `sirv` (script `start`),
// que escucha en $PORT sin verificación de host.
export default defineConfig({
  output: 'static',
});
