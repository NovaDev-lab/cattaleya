/**
 * Cattaleya - Inicio: colecciones y productos destacados
 */
(function() {
  'use strict';

  const categoriesEl = document.getElementById('home-categories');
  if (categoriesEl && typeof HOME_CATEGORIES !== 'undefined') {
    categoriesEl.innerHTML = HOME_CATEGORIES.map(cat => `
      <a href="productos.html?cat=${cat.id}" class="category-tile">
        <img src="${cat.image}" alt="${cat.name}" width="400" height="533" loading="lazy">
        <span class="category-tile__label">${cat.name}</span>
        <span class="category-tile__arrow" aria-hidden="true">→</span>
      </a>
    `).join('');
  }

  const featuredEl = document.getElementById('featured-products');
  if (featuredEl && typeof PRODUCTS !== 'undefined' && typeof renderLookbookCard === 'function') {
    const featured = (typeof HOME_FEATURED_IDS !== 'undefined'
      ? HOME_FEATURED_IDS.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean)
      : PRODUCTS.slice(0, 8));

    featuredEl.innerHTML = featured.map(product => `
      <div class="featured-carousel__slide" role="group" aria-roledescription="slide">
        ${renderLookbookCard(product)}
      </div>
    `).join('');
  }
})();
