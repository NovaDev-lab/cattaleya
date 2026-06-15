/**
 * Cattaleya - Navegación compartida
 */
const NAV_CONFIG = {
  instagram: 'https://instagram.com',
  whatsapp: '5213121234567'
};

function getNavLinks() {
  const instagram = typeof STORE !== 'undefined' ? STORE.instagram : NAV_CONFIG.instagram;
  const whatsapp = typeof getWhatsAppUrl === 'function'
    ? getWhatsAppUrl('general')
    : `https://wa.me/${NAV_CONFIG.whatsapp}?text=${encodeURIComponent('Hola, me interesa información sobre sus productos')}`;
  return { instagram, whatsapp };
}

function getNavHTML(activePage) {
  const { instagram, whatsapp } = getNavLinks();
  const instaIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>';
  const waIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
  const cartIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>';
  const userIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';

  return `
    <ul class="nav__list" id="nav-list">
      <li><a href="index.html" class="nav__link ${activePage === 'inicio' ? 'active' : ''}">Inicio</a></li>
      <li><a href="productos.html" class="nav__link ${activePage === 'productos' ? 'active' : ''}">Productos</a></li>
      <li><a href="contacto.html" class="nav__link ${activePage === 'contacto' ? 'active' : ''}">Contacto</a></li>
      <li class="nav__social">
        <a href="${instagram}" target="_blank" rel="noopener" class="nav__icon" aria-label="Instagram">${instaIcon}</a>
        <a href="${whatsapp}" target="_blank" rel="noopener" class="nav__icon" aria-label="WhatsApp">${waIcon}</a>
      </li>
      <li><a href="carrito.html" class="nav__icon nav__cart" aria-label="Carrito">
        ${cartIcon}
        <span class="cart-badge" id="cart-badge">0</span>
      </a></li>
      <li><a href="cuenta.html" class="nav__icon" aria-label="Mi cuenta">${userIcon}</a></li>
    </ul>
    <button class="menu-toggle" id="menu-toggle" aria-label="Abrir menú" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  `;
}

function renderNav(activePage) {
  const nav = document.querySelector('.nav');
  if (nav) {
    nav.innerHTML = getNavHTML(activePage);
    updateCartBadge();
    initNavEvents();
  }
}

function initNavEvents() {
  const menuToggle = document.getElementById('menu-toggle');
  const navList = document.getElementById('nav-list');
  if (!menuToggle || !navList) return;

  menuToggle.addEventListener('click', () => {
    navList.classList.toggle('nav__list--open');
    const isOpen = navList.classList.contains('nav__list--open');
    menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    menuToggle.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  });

  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('nav__list--open');
      document.body.classList.remove('nav-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menú');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navList.classList.remove('nav__list--open');
      document.body.classList.remove('nav-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav[data-active]');
  if (nav) renderNav(nav.dataset.active);
});

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const cart = JSON.parse(localStorage.getItem('cattaleya_cart') || '[]');
    const count = cart.reduce((s, i) => s + (i.qty || 1), 0);
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}
