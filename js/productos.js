/**
 * Cattaleya - Catálogo con filtros horizontales
 */
(function() {
  'use strict';

  const grid = document.getElementById('products-grid');
  const categoryNav = document.getElementById('categories-filter');
  const materialNav = document.getElementById('material-filter');
  const countEl = document.getElementById('catalog-count');
  const labelEl = document.getElementById('catalog-active-label');
  const emptyEl = document.getElementById('catalog-empty');
  const clearBtn = document.getElementById('filter-clear');
  const filtersBar = document.getElementById('catalog-filters');

  if (!grid || !categoryNav || !materialNav || typeof PRODUCTS === 'undefined') return;

  const categoryIds = CATEGORIES.map(c => c.id);
  const materialIds = Object.keys(MATERIAL_LABELS);

  const params = new URLSearchParams(location.search);
  let activeCategory = categoryIds.includes(params.get('cat') || '') ? params.get('cat') : 'todos';
  let activeMaterial = materialIds.includes(params.get('material') || '') ? params.get('material') : 'todos';

  if (params.get('cat') && 'scrollRestoration' in history) history.scrollRestoration = 'manual';

  categoryNav.innerHTML = `
    <button type="button" class="catalog-chip catalog-chip--cat" data-filter="category" data-value="todos">Todo</button>
    ${CATEGORIES.map(c => `
      <button type="button" class="catalog-chip catalog-chip--cat" data-filter="category" data-value="${c.id}">${c.name}</button>
    `).join('')}
  `;

  materialNav.innerHTML = `
    <button type="button" class="catalog-chip catalog-chip--mat" data-filter="material" data-value="todos">Todos</button>
    ${materialIds.map(id => `
      <button type="button" class="catalog-chip catalog-chip--mat" data-filter="material" data-value="${id}">${MATERIAL_LABELS[id]}</button>
    `).join('')}
  `;

  grid.innerHTML = PRODUCTS.map(renderLookbookCard).join('');

  function updateUrl() {
    const next = new URLSearchParams();
    if (activeCategory !== 'todos') next.set('cat', activeCategory);
    if (activeMaterial !== 'todos') next.set('material', activeMaterial);
    const qs = next.toString();
    const url = qs ? `${location.pathname}?${qs}` : location.pathname;
    history.replaceState(null, '', url);
  }

  function scrollActiveChip(container) {
    const active = container.querySelector('.catalog-chip.active');
    if (!active || !active.scrollIntoView) return;
    active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  function updateUI() {
    categoryNav.querySelectorAll('[data-filter="category"]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.value === activeCategory);
    });
    materialNav.querySelectorAll('[data-filter="material"]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.value === activeMaterial);
    });

    let visible = 0;
    grid.querySelectorAll('.lookbook-item').forEach(item => {
      const catOk = activeCategory === 'todos' || item.dataset.category === activeCategory;
      const matOk = activeMaterial === 'todos' || item.dataset.material === activeMaterial;
      const show = catOk && matOk;
      item.hidden = !show;
      if (show) visible += 1;
    });

    const hasFilters = activeCategory !== 'todos' || activeMaterial !== 'todos';
    if (clearBtn) clearBtn.hidden = !hasFilters;
    if (filtersBar) filtersBar.classList.toggle('catalog-filters--active', hasFilters);

    const catLabel = activeCategory === 'todos' ? null : CATEGORY_LABELS[activeCategory];
    const matLabel = activeMaterial === 'todos' ? null : MATERIAL_LABELS[activeMaterial];

    if (labelEl) {
      if (!hasFilters) labelEl.textContent = 'Todas las piezas';
      else if (catLabel && matLabel) labelEl.textContent = `${catLabel} · ${matLabel}`;
      else labelEl.textContent = catLabel || matLabel || 'Todas las piezas';
    }

    if (countEl) {
      countEl.textContent = visible === 1 ? '1 pieza' : `${visible} piezas`;
    }

    if (emptyEl) emptyEl.hidden = visible > 0;

    updateUrl();
  }

  function handleFilterClick(e) {
    const btn = e.target.closest('.catalog-chip');
    if (!btn) return;

    if (btn.dataset.filter === 'category') activeCategory = btn.dataset.value;
    if (btn.dataset.filter === 'material') activeMaterial = btn.dataset.value;
    updateUI();

    if (btn.dataset.filter === 'category') scrollActiveChip(categoryNav);
  }

  categoryNav.addEventListener('click', handleFilterClick);
  materialNav.addEventListener('click', handleFilterClick);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      activeCategory = 'todos';
      activeMaterial = 'todos';
      updateUI();
    });
  }

  window.addEventListener('pageshow', e => {
    if (e.persisted && location.search) window.scrollTo(0, 0);
  });

  updateUI();
  if (params.get('cat')) {
    requestAnimationFrame(() => {
      scrollActiveChip(categoryNav);
      window.scrollTo(0, 0);
    });
  }
})();
