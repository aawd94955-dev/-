/* ─────────────────────────────────────────────
   NMIXX Interactive Wallpaper — index.js
   ───────────────────────────────────────────── */
'use strict';

/* ── 설정 ── */
const CONFIG = {
  images: [
    'images/nmixx1.jpg',
    'images/nmixx2.jpg',
    'images/nmixx3.jpg',
    'images/nmixx4.jpg',
    'images/nmixx5.jpg',
  ],
  slideDuration: 700,   // 한 장 표시 시간 (ms)
  shuffle: false,        // true 로 바꾸면 랜덤 순서
};

/* ── 슬라이드쇼 ── */
const Slideshow = (() => {
  const container     = document.getElementById('slideshow');
  const indicatorWrap = document.getElementById('indicators');
  let slides = [], dots = [], current = 0, timer = null;

  const shuffleArr = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  /* 모든 이미지 미리 로드 */
  const preload = srcs => Promise.allSettled(
    srcs.map(src => new Promise(res => {
      const img = new Image();
      // 브라우저가 원본 해상도로 디코딩하도록 힌트
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
    if (CONFIG.shuffle) shuffleArr(srcs);
    if (!srcs.length) { container.style.background = '#111'; return; }

    await preload(srcs);

    srcs.forEach((src, i) => {
      const img = document.createElement('img');
      img.src     = src;
      img.alt     = '';
      img.loading = 'eager';
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

/* ── 시작 ── */
document.addEventListener('DOMContentLoaded', () => Slideshow.init());
