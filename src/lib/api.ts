import type { Order, Product } from './types';
import { sampleProducts } from './sample-products';

const ENDPOINT = import.meta.env.PUBLIC_APPS_SCRIPT_URL;

/**
 * Obtiene los productos. Se llama en build time desde index.astro.
 * Si no hay endpoint configurado (o falla), cae a datos de ejemplo
 * para que la app siga funcionando durante el desarrollo.
 */
export async function getProducts(): Promise<Product[]> {
  if (!ENDPOINT) return sampleProducts;

  try {
    const res = await fetch(ENDPOINT);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as Product[];
    // Normalizamos price a número por si la hoja lo devuelve como texto.
    return data.map((p) => ({ ...p, price: Number(p.price) }));
  } catch (err) {
    console.warn('[api] No se pudieron cargar productos, usando ejemplos:', err);
    return sampleProducts;
  }
}

/**
 * Envía una orden al endpoint (doPost de Apps Script).
 *
 * Detalles para evitar problemas de CORS con Apps Script:
 * - text/plain evita el preflight OPTIONS que Apps Script no maneja.
 * - mode: 'no-cors' hace el POST "fire-and-forget": Apps Script responde con
 *   un redirect 302 que el navegador no puede leer, pero la orden SÍ se
 *   escribe en la hoja. La respuesta es opaca, así que no la inspeccionamos;
 *   si fetch no lanza un error de red, asumimos éxito.
 */
export async function submitOrder(order: Order): Promise<void> {
  if (!ENDPOINT) {
    console.info('[api] Sin endpoint configurado. Orden simulada:', order);
    return;
  }

  await fetch(ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(order),
  });
}
