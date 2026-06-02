# Sabor & Co. — Plataforma de Restaurante (Take-home)

Plataforma de pedidos para un restaurante. Frontend estático con **Astro**,
**Google Sheets** como base de datos y **Google Apps Script** como capa API.

## Stack y decisiones

- **Astro (output estático)**: los productos se obtienen en *build time*, así la
  página carga sin spinners ni JS para listar el menú.
- **Carrito client-side** con [`nanostores`](https://github.com/nanostores/nanostores)
  + persistencia en `localStorage` (sobrevive recargas).
- **Apps Script** expone `doGet` (productos) y `doPost` (guardar orden).
- **Mobile-first** con CSS Grid responsive (`auto-fill` + `minmax`).

## Estructura

```
src/
  components/   ProductCard, ProductGrid, Cart (drawer + lógica de cliente)
  layouts/      BaseLayout
  lib/          types, api (fetch productos + envío orden), cart (estado)
  pages/        index.astro (única página)
  styles/       global.css
apps-script/    Code.gs (versionado, vive en Apps Script)
```

## Cómo correr

```bash
npm install
npm run dev      # http://localhost:4321
```

Sin configuración funciona con **datos de ejemplo** (`src/lib/sample-products.ts`).

## Conectar Google Sheets + Apps Script

1. Crea un Google Sheet con dos hojas:
   - `Products` con encabezados: `id | name | description | price | image | category`
   - `Orders` (se llena sola). Encabezados sugeridos: `fecha | nombre | email | notas | items_json | total`
2. En el Sheet: **Extensiones → Apps Script** y pega el contenido de
   [`apps-script/Code.gs`](apps-script/Code.gs).
3. **Implementar → Nueva implementación → Aplicación web**
   - Ejecutar como: *Yo* · Acceso: *Cualquiera*
   - Copia la URL `/exec`.
4. Crea `.env` a partir de `.env.example` y pega la URL:

   ```
   PUBLIC_APPS_SCRIPT_URL=https://tu_public_app_script.exec
   ```

5. `npm run build && npm run preview`.

> Nota: tras cambiar `Code.gs`, crea una **nueva versión** de la implementación
> o seguirás golpeando el código anterior. El POST usa `text/plain` a propósito
> para evitar el preflight CORS que Apps Script no maneja.

## Build de producción

```bash
npm run build    # genera dist/ (estático, desplegable en cualquier CDN)
```

# URL deploy que hice en Railway

https://take-home-production-7414.up.railway.app/

## Que haria con otra hora
Implementaria mejor una experiencia de usuario y haria mas robusto el flujo, como agregar categorias y filtros simples en el menu, mejorar el manejo de errores y estados de carga, agregar confirmaciones visuales mas adecuadas para cada caso.

## Receta para una pizza colombiana basica ;)

Tirar la masa en la bandeja preparada con un poco de hariana antes, salsa de tomate, jamon, queso, pina y pollo desmechado, despues al horno por unos 15 minutos y tamos listos
