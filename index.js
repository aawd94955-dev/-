'use strict';

const CONFIG = {
  images: [
    'images/nmixx1.jpg',
    'images/nmixx2.jpg',
    'images/nmixx3.jpg',
    'images/nmixx4.jpg',
    'images/nmixx5.jpg',
  ],
  slideDuration: 7000,
  shuffle: false,
  parallaxStrength: 18,
};

const Slideshow = (() => {
  const container     = document.getElementById('slideshow');
  const indicatorWrap = document.getElementById('indicators');
  let slides = [], dots = [], current = 0, timer = null;

  const preload = srcs => Promise.allSettled(
    srcs.map(src => new Promise(res => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = img.onerror = () => res(src);
      img.src = src;
    }))
  );

  function goTo(index) {
    const prev = current;
    current = (index + slides.length) % slides.length;
    slides[prev].classList.remove('active');
    slides[current].classList.add('active');
    dots[prev]?.classList.remove('active');
    dots[current]?.classList.add('active');
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), CONFIG.slideDuration);
  }

  async function init() {
    let srcs = [...CONFIG.images];
    if (!srcs.length) { container.style.background = '#111'; return; }

    await preload(srcs);

    srcs.forEach((src, i) => {
      const img = document.createElement('img');
      img.src      = src;
      img.alt      = '';
      img.loading  = 'eager';
      img.decoding = 'async';
      container.appendChild(img);
      slides.push(img);

      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('aria-label', `슬라이드 ${i + 1}`);
      dot.addEventListener('click', () => { goTo(i); startAuto(); });
      indicatorWrap.appendChild(dot);
      dots.push(dot);
    });

    goTo(0);
    startAuto();
  }

  return { init };
})();

const Parallax = (() => {
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let rafId = null;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function onMouseMove(e) {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    targetX = ((e.clientX - cx) / cx) * CONFIG.parallaxStrength;
    targetY = ((e.clientY - cy) / cy) * CONFIG.parallaxStrength;
  }

  function tick() {
    currentX = lerp(currentX, targetX, 0.06);
    currentY = lerp(currentY, targetY, 0.06);

    const imgs = document.querySelectorAll('#slideshow img');
    imgs.forEach(img => {
      img.style.transform = `translate(${-currentX}px, ${-currentY}px)`;
    });

    rafId = requestAnimationFrame(tick);
  }

  function init() {
    window.addEventListener('mousemove', onMouseMove);
    tick();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
  Slideshow.init();
  Parallax.init();
});
