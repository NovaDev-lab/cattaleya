/**
 * Cattaleya - Slider de imágenes en hero
 */
(function() {
  'use strict';
  const slides = document.querySelectorAll('.hero-slider__slide');
  if (slides.length < 2) return;

  let current = 0;
  const interval = 5000;

  function showSlide(i) {
    slides.forEach((s, j) => s.classList.toggle('active', j === i));
    current = i;
  }

  function next() {
    showSlide((current + 1) % slides.length);
  }

  showSlide(0);
  setInterval(next, interval);
})();
