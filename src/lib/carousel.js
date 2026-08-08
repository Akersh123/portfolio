import { TESTIMONIALS } from "../content.js";

function normalize(deg) {
  let a = deg % 360;
  if (a > 180) a -= 360;
  if (a < -180) a += 360;
  return a;
}

export function initCarousel(gsap) {
  const track = document.getElementById("carousel-track");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  if (!track) return;

  const cards = [...track.querySelectorAll(".carousel-card")];
  const total = TESTIMONIALS.length;
  const step = 360 / total;
  const state = { angle: 0, dragging: false, lastX: 0, hovered: false };

  function render() {
    track.style.transform = `rotateY(${state.angle}deg)`;
    cards.forEach((card) => {
      const i = Number(card.dataset.index);
      const world = normalize(i * step + state.angle);
      const dist = Math.abs(world);
      const opacity = 1 - Math.min(dist / (step * 1.2), 1) * 0.85;
      card.style.opacity = String(opacity);
      card.style.zIndex = String(100 - Math.round(dist));
      card.style.pointerEvents = dist < step / 2 ? "auto" : "none";
    });
  }

  function goTo(index) {
    gsap.to(state, {
      angle: -index * step,
      duration: 0.9,
      ease: "power3.out",
      onUpdate: render,
    });
  }

  let current = 0;
  nextBtn?.addEventListener("click", () => {
    current += 1;
    goTo(current);
  });
  prevBtn?.addEventListener("click", () => {
    current -= 1;
    goTo(current);
  });

  track.addEventListener("mouseenter", () => (state.hovered = true));
  track.addEventListener("mouseleave", () => (state.hovered = false));

  track.addEventListener("pointerdown", (event) => {
    state.dragging = true;
    state.lastX = event.clientX;
    track.setPointerCapture(event.pointerId);
  });
  track.addEventListener("pointermove", (event) => {
    if (!state.dragging) return;
    const dx = event.clientX - state.lastX;
    state.lastX = event.clientX;
    state.angle += dx * 0.3;
    render();
  });
  const stopDrag = () => {
    if (!state.dragging) return;
    state.dragging = false;
    current = Math.round(-state.angle / step);
    goTo(current);
  };
  track.addEventListener("pointerup", stopDrag);
  track.addEventListener("pointerleave", stopDrag);
  track.addEventListener("pointercancel", stopDrag);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    gsap.ticker.add(() => {
      if (state.dragging || state.hovered) return;
      state.angle += 0.035;
      render();
    });
  }

  render();
}
