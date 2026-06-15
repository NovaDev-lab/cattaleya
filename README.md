# Cattaleya Joyería

Preview estático de tienda de joyería (destino: Shopify). Paleta neutra — beige, blanco, hueso — inspirada en referencias como quererlo.com, lavetem.com y rossamagenta.com.

## Estructura

```
Cattaleya/
├── index.html
├── productos.html
├── producto.html
├── carrito.html
├── checkout.html
├── contacto.html
├── css/app.css
├── js/
│   ├── data/
│   │   ├── store.js      # Envíos, pagos, WhatsApp
│   │   └── products.js   # Catálogo y categorías
│   ├── nav.js
│   ├── cart.js
│   ├── checkout.js
│   └── ...
```

## Negocio (configurado en preview)

### Envíos
- **Gratis** desde **$999 MXN** a toda la República Mexicana
- **Envío local Colima** con costo adicional
- **Recoger en tienda** sin costo (Av. Tecnológico #9 interior 2, Colima)

### Pagos
- **En tienda:** efectivo, transferencia
- **En línea (Shopify):** tarjeta, transferencia

### WhatsApp
Atención personalizada para collares personalizados, cotizaciones y dudas.

### Catálogo
Aretes, collares (incl. personalizados), anillos, pulseras, brazaletes, earcuffs/simulaciones, perclingas, alajeros, aretes de fiesta, juegos/sets en plata .925, blusas, mascaradas. Materiales: plata .925, acero, oro.

## Personalización

- **Envíos y umbrales:** `js/data/store.js`
- **Productos y categorías:** `js/data/products.js`
- **WhatsApp / Instagram:** `js/data/store.js` y `js/nav.js`

## Cómo ver localmente

```bash
npx serve .
```

## Referencias visuales

- quererlo.com
- lavetem.com
- rossamagenta.com
