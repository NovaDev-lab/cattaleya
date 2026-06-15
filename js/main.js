/**
 * Cattaleya - Script principal
 */
(function() {
  'use strict';

  const header = document.getElementById('header');
  if (header) {
    function onScroll() {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (typeof STORE !== 'undefined' && !header.querySelector('.announcement-bar')) {
      const bar = document.createElement('div');
      bar.className = 'announcement-bar';
      bar.innerHTML = `Envío gratis desde ${formatMXN(STORE.freeShippingThreshold)} · Recoge en tienda · <a href="${getWhatsAppUrl('general')}" target="_blank" rel="noopener">WhatsApp</a>`;
      header.insertBefore(bar, header.firstChild);

      function syncAnnouncementHeight() {
        const height = bar.offsetHeight;
        document.documentElement.style.setProperty('--announcement-height', `${height}px`);
        document.documentElement.style.setProperty('--header-total-height', `calc(var(--header-height) + ${height}px)`);
      }

      syncAnnouncementHeight();
      window.addEventListener('resize', syncAnnouncementHeight, { passive: true });
      if (typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(syncAnnouncementHeight).observe(bar);
      }
    }
  }
})();
