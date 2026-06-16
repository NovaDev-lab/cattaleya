/**
 * Cattaleya - Carrusel de información de contacto (móvil)
 */
(function() {
  'use strict';

  const track = document.getElementById('contact-cards');
  const dotsEl = document.getElementById('contact-dots');
  const prevBtn = document.getElementById('contact-prev');
  const nextBtn = document.getElementById('contact-next');
  const viewport = track?.closest('.contact-carousel__viewport');
  const footer = document.querySelector('.contact-carousel__footer');

  if (!track || !dotsEl || !viewport) return;

  const slides = () => [...track.querySelectorAll('.contact-carousel__slide')];
  const mqDesktop = window.matchMedia('(min-width: 768px)');

  if (slides().length <= 1) {
    if (footer) footer.style.display = 'none';
    return;
  }

  let index = 0;
  let timer = null;
  let touchStartX = 0;

  function isCarouselMode() {
    return !mqDesktop.matches && slides().length > 1;
  }

  function slideOffset() {
    return viewport.getBoundingClientRect().width * index;
  }

  function renderDots() {
    dotsEl.innerHTML = '';
    slides().forEach((slide, i) => {
      const label = slide.querySelector('.contact-card__label')?.textContent?.trim() || `Sección ${i + 1}`;
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'contact-carousel__dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `${label} (${i + 1} de ${slides().length})`);
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
      dot.addEventListener('click', () => goTo(i, true));
      dotsEl.appendChild(dot);
    });
  }

  function updateDots() {
    dotsEl.querySelectorAll('.contact-carousel__dot').forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  function applyTransform() {
    track.style.transform = `translate3d(-${slideOffset()}px, 0, 0)`;
  }

  function goTo(nextIndex, userAction) {
    const total = slides().length;
    if (!total) return;

    if (!isCarouselMode()) {
      track.style.transform = '';
      return;
    }

    index = ((nextIndex % total) + total) % total;
    applyTransform();
    updateDots();

    if (userAction) resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    if (!isCarouselMode()) return;
    timer = setInterval(() => goTo(index + 1, false), 6000);
  }

  function setupMode() {
    clearInterval(timer);

    if (isCarouselMode()) {
      if (footer) footer.style.display = '';
      renderDots();
      goTo(index, false);
      resetTimer();
    } else {
      if (footer) footer.style.display = 'none';
      track.style.transform = '';
      dotsEl.innerHTML = '';
      index = 0;
    }
  }

  prevBtn?.addEventListener('click', () => goTo(index - 1, true));
  nextBtn?.addEventListener('click', () => goTo(index + 1, true));

  viewport.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0]?.clientX ?? 0;
  }, { passive: true });

  viewport.addEventListener('touchend', e => {
    if (!isCarouselMode()) return;
    const endX = e.changedTouches[0]?.clientX ?? 0;
    const diff = endX - touchStartX;
    if (Math.abs(diff) < 48) return;
    goTo(index + (diff < 0 ? 1 : -1), true);
  }, { passive: true });

  viewport.addEventListener('mouseenter', () => clearInterval(timer));
  viewport.addEventListener('mouseleave', () => resetTimer());

  window.addEventListener('resize', () => {
    if (isCarouselMode()) applyTransform();
  }, { passive: true });

  mqDesktop.addEventListener('change', setupMode);
  setupMode();
})();
