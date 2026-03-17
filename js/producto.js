/**
 * Cattaleya - Página detalle de producto
 */
(function() {
  'use strict';

  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id'), 10);
  const product = PRODUCTS.find(p => p.id === id);

  const container = document.getElementById('product-container');
  const loading = document.getElementById('product-loading');
  const detail = document.getElementById('product-detail');
  const relatedSection = document.getElementById('related-section');
  const relatedGrid = document.getElementById('related-products');

  if (!product) {
    loading.textContent = 'Producto no encontrado';
    setTimeout(() => location.assign('productos.html'), 2000);
    return;
  }

  const catNames = { anillos: 'Anillos', collares: 'Collares', aretes: 'Aretes', pulseras: 'Pulseras' };

  loading.style.display = 'none';
  detail.style.display = 'grid';

  document.title = `${product.name} | Cattaleya Joyería`;
  document.getElementById('product-category').textContent = catNames[product.category] || product.category;
  document.getElementById('product-title').textContent = product.name;
  document.getElementById('product-sku').textContent = product.sku;
  const priceEl = document.getElementById('product-price');
  function updatePrice() {
    const qty = parseInt(qtyInput.value, 10);
    priceEl.textContent = `$${(product.price * qty).toLocaleString('es-MX')} MXN`;
  }
  document.getElementById('product-desc').textContent = product.description;

  const sliderImages = document.getElementById('slider-images');
  const sliderDots = document.getElementById('slider-dots');
  product.images.forEach((src, i) => {
    sliderImages.innerHTML += `<img src="${src}" alt="${product.name} ${i + 1}">`;
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Imagen ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    sliderDots.appendChild(dot);
  });

  let currentSlide = 0;
  const totalSlides = product.images.length;

  function goToSlide(i) {
    currentSlide = (i + totalSlides) % totalSlides;
    sliderImages.style.transform = `translateX(-${currentSlide * 100}%)`;
    sliderDots.querySelectorAll('.slider-dot').forEach((d, j) => d.classList.toggle('active', j === currentSlide));
  }

  document.querySelector('.slider-btn--prev').addEventListener('click', () => goToSlide(currentSlide - 1));
  document.querySelector('.slider-btn--next').addEventListener('click', () => goToSlide(currentSlide + 1));

  const qtyInput = document.getElementById('product-qty');
  document.getElementById('qty-minus').addEventListener('click', () => {
    const v = Math.max(1, parseInt(qtyInput.value, 10) - 1);
    qtyInput.value = v;
    updatePrice();
  });
  document.getElementById('qty-plus').addEventListener('click', () => {
    const v = Math.min(10, parseInt(qtyInput.value, 10) + 1);
    qtyInput.value = v;
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

    if (relatedSection.offsetParent) {
      relatedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  updatePrice();

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  if (related.length > 0) {
    relatedSection.style.display = 'block';
    related.forEach(p => {
      relatedGrid.innerHTML += `
        <a href="producto.html?id=${p.id}" class="product-card">
          <div class="product-card__image">
            <img src="${p.images[0]}" alt="${p.name}" width="400" height="400" loading="lazy">
          </div>
          <div class="product-card__content">
            <span class="product-card__category">${catNames[p.category]}</span>
            <h3 class="product-card__title">${p.name}</h3>
            <span class="product-card__price">$${p.price.toLocaleString('es-MX')} MXN</span>
          </div>
        </a>
      `;
    });
  }
})();
