const STAR_COLORS = ["#39ff14", "#00ff7f", "#7cff00", "#2bff88", "#00e5a0", "#e2e8f0"];

export function initStarfield() {
  const container = document.getElementById("hero-canvas");
  if (!container) return () => {};

  const canvas = document.createElement("canvas");
  container.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let width = 0;
  let height = 0;
  let stars = [];

  function buildStars() {
    const area = width * height;
    const count = Math.min(260, Math.max(80, Math.round(area / 6000)));
    stars = Array.from({ length: count }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.4 + 0.4,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      base: Math.random() * 0.25 + 0.1,
      amp: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 1.1 + 0.3,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function resize() {
    const rect = container.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildStars();
  }

  function draw(elapsed) {
    ctx.clearRect(0, 0, width, height);
    stars.forEach((star) => {
      const twinkle = reduceMotion ? 0.6 : Math.sin(elapsed * star.speed + star.phase) * 0.5 + 0.5;
      ctx.globalAlpha = star.base + twinkle * star.amp;
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  let isVisible = true;
  const observer = new IntersectionObserver(([entry]) => (isVisible = entry.isIntersecting), { threshold: 0.05 });
  observer.observe(container);

  let rafId = 0;
  const start = performance.now();

  function tick(now) {
    rafId = requestAnimationFrame(tick);
    if (!isVisible || document.hidden) return;
    draw((now - start) / 1000);
  }

  resize();
  window.addEventListener("resize", resize);

  if (reduceMotion) {
    draw(0);
  } else {
    rafId = requestAnimationFrame(tick);
  }

  return function destroy() {
    cancelAnimationFrame(rafId);
    window.removeEventListener("resize", resize);
    observer.disconnect();
    container.innerHTML = "";
  };
}
