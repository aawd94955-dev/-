/* ─────────────────────────────────────────────
   NMIXX Interactive Wallpaper — style.css
   ───────────────────────────────────────────── */

/* ── CSS 변수 ── */
:root {
  --accent:       #e8ff47;   /* NMIXX 시그니처 라임 옐로우 */
  --accent2:      #ff4fd8;   /* 핑크 포인트 */
  --dark:         #080808;
  --card-bg:      rgba(8, 8, 8, 0.55);
  --card-border:  rgba(255, 255, 255, 0.12);
  --text-primary: #ffffff;
  --text-muted:   rgba(255, 255, 255, 0.55);
  --font-display: 'Bebas Neue', sans-serif;
  --font-body:    'Noto Sans KR', sans-serif;
  --font-mono:    'Space Mono', monospace;
  --slide-duration: 7s;        /* 슬라이드 표시 시간 (JS와 동기화) */
  --fade-duration:  1.4s;
}

/* ── 리셋 & 기본 ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  width: 100%; height: 100%;
  overflow: hidden;
  background: var(--dark);
  color: var(--text-primary);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

/* ── 그레인 오버레이 ── */
.grain {
  pointer-events: none;
  position: fixed; inset: 0; z-index: 10;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.055;
}

/* ── 슬라이드쇼 컨테이너 ── */
#slideshow {
  position: fixed; inset: 0; z-index: 0;
}

#slideshow img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center top;
  opacity: 0;
  transition: opacity var(--fade-duration) ease-in-out;
  will-change: opacity;
}

#slideshow img.active {
  opacity: 1;
}

/* 배경 이미지 위에 세련된 그라디언트 베일 */
#slideshow::after {
  content: '';
  position: absolute; inset: 0; z-index: 1;
  background:
    linear-gradient(to top,  rgba(0,0,0,0.72) 0%, transparent 45%),
    linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 30%),
    linear-gradient(135deg, rgba(232,255,71,0.04) 0%, transparent 60%);
}

/* ── 상단 헤더 / 로고 ── */
.site-header {
  position: fixed;
  top: 36px; left: 48px;
  z-index: 50;
  display: flex;
  align-items: baseline;
  gap: 14px;
}

.logo-nmixx {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.4rem);
  letter-spacing: 0.18em;
  color: var(--accent);
  text-shadow: 0 0 40px rgba(232,255,71,0.45);
  line-height: 1;
}

.logo-sub {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  color: var(--text-muted);
  text-transform: uppercase;
}

/* ── 시계 ── */
.clock-wrap {
  position: fixed;
  top: 50%;
  right: 56px;
  transform: translateY(-50%);
  z-index: 50;
  text-align: right;
  pointer-events: none;
}

.clock-time {
  font-family: var(--font-display);
  font-size: clamp(4rem, 9vw, 8.5rem);
  letter-spacing: 0.06em;
  line-height: 1;
  color: var(--text-primary);
  text-shadow: 0 2px 60px rgba(0,0,0,0.5);
}

.clock-date {
  font-family: var(--font-mono);
  font-size: clamp(0.6rem, 1vw, 0.8rem);
  letter-spacing: 0.28em;
  color: var(--text-muted);
  margin-top: 8px;
}

/* ── 슬라이드 인디케이터 ── */
.indicators {
  position: fixed;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  display: flex;
  gap: 8px;
  align-items: center;
}

.indicators .dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  transition: background 0.4s ease, transform 0.4s ease, width 0.4s ease;
  cursor: pointer;
}

.indicators .dot.active {
  background: var(--accent);
  width: 24px;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(232,255,71,0.6);
}

/* ── 미디어 세션 카드 ── */
.media-card {
  position: fixed;
  bottom: 40px;
  left: 48px;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px 14px 14px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  backdrop-filter: blur(24px) saturate(1.6);
  -webkit-backdrop-filter: blur(24px) saturate(1.6);
  max-width: 360px;
  min-width: 260px;

  /* 기본: 숨김 */
  opacity: 0;
  transform: translateY(16px);
  pointer-events: none;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.media-card.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* 앨범 아트 */
.media-art-wrap {
  position: relative;
  flex-shrink: 0;
  width: 56px; height: 56px;
  border-radius: 10px;
  overflow: hidden;
}

.media-art {
  width: 100%; height: 100%;
  object-fit: cover;
  border-radius: 10px;
  display: block;
}

.media-art-blur {
  position: absolute; inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(12px) brightness(0.6);
  transform: scale(1.3);
  z-index: -1;
}

/* 앨범 아트 없을 때 기본 아이콘 */
.media-art[src=''] {
  background: linear-gradient(135deg, #1a1a1a, #333);
}
.media-art[src='']::after {
  content: '♪';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: var(--text-muted);
}

/* 텍스트 정보 */
.media-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.media-title {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.88rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.media-artist {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--accent);
  letter-spacing: 0.04em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.media-album {
  font-size: 0.7rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 뮤직 바 애니메이션 */
.media-bars {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 20px;
  flex-shrink: 0;
}

.media-bars span {
  display: block;
  width: 3px;
  background: var(--accent2);
  border-radius: 2px;
  animation: musicBar 0.9s ease-in-out infinite alternate;
  transform-origin: bottom;
}

.media-bars span:nth-child(1) { height: 8px;  animation-delay: 0.0s; }
.media-bars span:nth-child(2) { height: 16px; animation-delay: 0.15s; }
.media-bars span:nth-child(3) { height: 12px; animation-delay: 0.3s; }
.media-bars span:nth-child(4) { height: 20px; animation-delay: 0.45s; }
.media-bars span:nth-child(5) { height: 10px; animation-delay: 0.6s; }

@keyframes musicBar {
  from { transform: scaleY(0.25); opacity: 0.7; }
  to   { transform: scaleY(1);    opacity: 1; }
}

/* 재생 중 아닐 때 바 정지 */
.media-card:not(.playing) .media-bars span {
  animation-play-state: paused;
  transform: scaleY(0.25);
  opacity: 0.4;
}

/* ── 유틸 ── */
@media (max-width: 600px) {
  .site-header { top: 20px; left: 20px; }
  .clock-wrap  { right: 20px; }
  .media-card  { left: 16px; bottom: 20px; max-width: calc(100vw - 32px); }
  .indicators  { bottom: 20px; }
}
