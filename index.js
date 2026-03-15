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
};

const Slideshow = (() => {
  const container     = document.getElementById('slideshow');
  const indicatorWrap = document.getElementById('indicators');
  let slides = [], dots = [], current = 0, timer = null, animating = false;

  const shuffleArr = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  const preload = srcs => Promise.allSettled(
    srcs.map(src => new Promise(res => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = img.onerror = () => res(src);
      img.src = src;
    }))
  );

  function goTo(index) {
    if (animating) return;
    const next = (index + slides.length) % slides.length;
    if (next === current) return;
    animating = true;

    const incoming = slides[next];
    const outgoing = slides[current];

    incoming.style.transition = 'none';
    incoming.style.transform  = 'translateX(100%)';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        incoming.style.transition = 'transform 0.9s cubic-bezier(0.77, 0, 0.18, 1)';
        incoming.style.transform  = 'translateX(0%)';
        outgoing.style.transition = 'transform 0.9s cubic-bezier(0.77, 0, 0.18, 1)';
        outgoing.style.transform  = 'translateX(-100%)';

        dots[current]?.classList.remove('active');
        current = next;
        dots[current]?.classList.add('active');

        setTimeout(() => {
          slides.forEach((s, i) => {
            if (i !== current) {
              s.style.transition = 'none';
              s.style.transform  = 'translateX(100%)';
            }
          });
          animating = false;
        }, 950);
      });
    });
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), CONFIG.slideDuration);
  }

  async function init() {
    let srcs = [...CONFIG.images];
    if (CONFIG.shuffle) shuffleArr(srcs);
    if (!srcs.length) { container.style.background = '#111'; return; }

    await preload(srcs);

    srcs.forEach((src, i) => {
      const img = document.createElement('img');
      img.src      = src;
      img.alt      = '';
      img.loading  = 'eager';
      img.decoding = 'async';
      img.style.transform = i === 0 ? 'translateX(0%)' : 'translateX(100%)';
      container.appendChild(img);
      slides.push(img);

      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('aria-label', `슬라이드 ${i + 1}`);
      dot.addEventListener('click', () => { goTo(i); startAuto(); });
      indicatorWrap.appendChild(dot);
      dots.push(dot);
    });

    dots[0]?.classList.add('active');
    startAuto();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => Slideshow.init());
