# Cattaleya Joyería

Sitio web para joyería con diseño minimalista, paleta rosa pastel y alto contraste.

## Estructura

```
Cattaleya/
├── index.html          # Inicio
├── productos.html      # Catálogo con filtros
├── producto.html       # Detalle de producto (slider, SKU, añadir al carrito)
├── carrito.html        # Carrito de compras
├── checkout.html       # Checkout (envío/recoger, CLABE, ticket)
├── cuenta.html         # Login/registro de usuarios
├── contacto.html       # Ubicación, horarios, redes
├── css/
├── js/
│   ├── data/products.js # Catálogo de productos
│   ├── nav.js          # Navegación con iconos y categorías
│   ├── cart.js         # Carrito y usuarios
│   ├── producto.js     # Página detalle
│   ├── carrito.js      # Página carrito
│   ├── checkout.js     # Checkout y ticket
│   └── cuenta.js       # Autenticación
└── assets/
```

## Funcionalidades

- **Navegación**: Menú con categorías desplegables, iconos Instagram/WhatsApp, carrito, cuenta
- **Productos**: Filtro por categoría, páginas detalladas con slider de imágenes, SKU, precio, añadir al carrito
- **Carrito**: Añadir, modificar cantidad, eliminar
- **Checkout**: Envío a domicilio o recoger en sucursal, CLABE para pago, generación de ticket
- **Usuarios**: Registro e inicio de sesión (localStorage, demo)

## Ubicación y horarios

- **Dirección**: Av. Tecnológico #9 interior 2, Lomas Vista Hermosa, 28016 Colima, Col.
- **Horarios**: Lunes a Sábado 11:00 am - 8:00 pm. Domingos cerrado.

## Personalización

- **WhatsApp**: Editar en `js/nav.js` y enlaces
- **Instagram**: Editar en `js/nav.js`
- **Productos**: Editar `js/data/products.js`

## Cómo ver localmente

```bash
npx serve .
```

## Subir a Git (para mostrar al cliente)

El repositorio ya está inicializado. Para subirlo a GitHub:

1. Crea un repositorio nuevo en [GitHub](https://github.com/new) (ej: `cattaleya-joyeria`)
2. Ejecuta:

```bash
cd C:\Users\Colibecas\Documents\Works\Cattaleya
git remote add origin https://github.com/TU_USUARIO/cattaleya-joyeria.git
git branch -M main
git push -u origin main
```

Para desplegar en GitHub Pages (sitio público gratis):
- Ve a Settings → Pages del repositorio
- Source: Deploy from a branch
- Branch: main, carpeta: / (root)
