/**
 * Cattaleya - Script principal
 * Header scroll (menú móvil manejado por nav.js)
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
  }
})();
