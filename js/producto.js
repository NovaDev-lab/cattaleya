/**
 * Cattaleya - Página detalle de producto
 */
(function() {
  'use strict';

  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id'), 10);
  const product = PRODUCTS.find(p => p.id === id);

  const loading = document.getElementById('product-loading');
  const detail = document.getElementById('product-detail');
  const relatedSection = document.getElementById('related-section');
  const relatedGrid = document.getElementById('related-products');

  if (!product) {
    loading.textContent = 'Producto no encontrado';
    setTimeout(() => location.assign('productos.html'), 2000);
    return;
  }

  const catLabel = CATEGORY_LABELS[product.category] || product.category;

  loading.style.display = 'none';
  detail.style.display = 'grid';

  document.title = `${product.name} | Cattaleya Joyería`;

  const breadcrumb = document.getElementById('product-breadcrumb');
  if (breadcrumb) {
    breadcrumb.innerHTML = `
      <a href="productos.html">Catálogo</a>
      <span>/</span>
      <a href="productos.html?cat=${product.category}">${catLabel}</a>
      <span>/</span>
      <span aria-current="page">${product.name}</span>
    `;
  }

  document.getElementById('product-category').textContent = catLabel;

  const materialEl = document.getElementById('product-material');
  if (materialEl && product.material) {
    materialEl.textContent = MATERIAL_LABELS[product.material] || product.material;
  }

  const badgeEl = document.getElementById('product-badge');
  if (badgeEl) {
    badgeEl.style.display = product.personalized ? 'inline-block' : 'none';
  }

  const whatsappBox = document.getElementById('product-whatsapp');
  if (whatsappBox) {
    whatsappBox.style.display = product.personalized ? 'flex' : 'none';
    const waLink = document.getElementById('product-whatsapp-link');
    if (waLink) {
      const msg = `${STORE.whatsappMessages.personalized} — ${product.name}`;
      waLink.href = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`;
    }
  }

  document.getElementById('product-title').textContent = product.name;
  document.getElementById('product-sku').textContent = product.sku;
  const priceEl = document.getElementById('product-price');
  const qtyInput = document.getElementById('product-qty');

  function updatePrice() {
    const qty = parseInt(qtyInput.value, 10);
    priceEl.textContent = formatMXN(product.price * qty);
  }

  document.getElementById('product-desc').textContent = product.description;

  const shippingEl = document.getElementById('product-shipping');
  if (shippingEl) {
    shippingEl.innerHTML = product.price >= STORE.freeShippingThreshold
      ? 'Este producto califica para <strong>envío nacional gratis</strong>.'
      : `Envío nacional gratis en compras desde ${formatMXN(STORE.freeShippingThreshold)}. También envío local en Colima y recoger en tienda.`;
  }

  const galleryStack = document.getElementById('product-gallery-stack');
  if (galleryStack) {
    galleryStack.innerHTML = product.images.map((src, i) => `
      <figure class="product-gallery__frame">
        <img src="${src}" alt="${product.name} — imagen ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}">
      </figure>
    `).join('');
  }

  document.getElementById('qty-minus').addEventListener('click', () => {
    qtyInput.value = Math.max(1, parseInt(qtyInput.value, 10) - 1);
    updatePrice();
  });
  document.getElementById('qty-plus').addEventListener('click', () => {
    qtyInput.value = Math.min(10, parseInt(qtyInput.value, 10) + 1);
    updatePrice();
  });
  qtyInput.addEventListener('change', updatePrice);

  document.getElementById('add-to-cart').addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cattaleya_cart') || '[]');
    const existing = cart.find(i => i.id === product.id);
    const qty = parseInt(qtyInput.value, 10);
    if (existing) existing.qty += qty;
    else cart.push({ id: product.id, name: product.name, price: product.price, sku: product.sku, image: product.images[0], qty });
    localStorage.setItem('cattaleya_cart', JSON.stringify(cart));
    if (typeof updateCartBadge === 'function') updateCartBadge();

    const toast = document.getElementById('toast-cart');
    if (toast) {
      toast.classList.add('toast--visible');
      setTimeout(() => toast.classList.remove('toast--visible'), 2500);
    }
  });

  updatePrice();

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  if (related.length > 0 && typeof renderLookbookCard === 'function') {
    relatedSection.style.display = 'block';
    relatedGrid.innerHTML = related.map(renderLookbookCard).join('');
  }
})();
