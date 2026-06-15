/**
 * Cattaleya - Tarjetas de producto (lookbook)
 */
function renderLookbookCard(product) {
  const label = CATEGORY_LABELS[product.category] || product.category;
  return `<a href="producto.html?id=${product.id}" class="lookbook-item" data-category="${product.category}" data-material="${product.material || ''}">
    <div class="lookbook-item__media">
      <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
    </div>
    <div class="lookbook-item__info">
      <div class="lookbook-item__meta">
        <span class="lookbook-item__cat">${label}</span>
        <h3 class="lookbook-item__name">${product.name}</h3>
      </div>
      <span class="lookbook-item__price">${formatMXN(product.price)}</span>
    </div>
  </a>`;
}
