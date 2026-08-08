export function initCursor(gsap) {
  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!isFinePointer) return;

  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  const spotlight = document.getElementById("cursor-spotlight");
  if (!dot || !ring || !spotlight) return;

  gsap.set([dot, ring, spotlight], { opacity: 0 });

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let ringX = pos.x;
  let ringY = pos.y;
  let hasMoved = false;

  window.addEventListener("mousemove", (event) => {
    pos.x = event.clientX;
    pos.y = event.clientY;
    if (!hasMoved) {
      hasMoved = true;
      ringX = pos.x;
      ringY = pos.y;
      gsap.set(ring, { x: ringX, y: ringY });
      gsap.to([dot, ring, spotlight], { opacity: 1, duration: 0.3 });
    }
    gsap.to(dot, { x: pos.x, y: pos.y, duration: 0.05, ease: "none" });
    gsap.to(spotlight, { x: pos.x, y: pos.y, duration: 0.5, ease: "power2.out" });
  });

  document.addEventListener("mouseleave", () => {
    gsap.to([dot, ring, spotlight], { opacity: 0, duration: 0.3 });
  });
  document.addEventListener("mouseenter", () => {
    if (hasMoved) gsap.to([dot, ring, spotlight], { opacity: 1, duration: 0.3 });
  });

  gsap.ticker.add(() => {
    if (!hasMoved) return;
    ringX += (pos.x - ringX) * 0.18;
    ringY += (pos.y - ringY) * 0.18;
    gsap.set(ring, { x: ringX, y: ringY });
  });

  const interactiveSelector = "a, button, .magnetic, .skill-card, .terminal-entry, .hex-shape, input, textarea";
  document.addEventListener("mouseover", (event) => {
    if (event.target.closest?.(interactiveSelector)) {
      ring.classList.add("is-active");
    }
  });
  document.addEventListener("mouseout", (event) => {
    if (event.target.closest?.(interactiveSelector)) {
      ring.classList.remove("is-active");
    }
  });

  document.addEventListener("mousedown", () => gsap.to(dot, { scale: 0.5, duration: 0.15 }));
  document.addEventListener("mouseup", () => gsap.to(dot, { scale: 1, duration: 0.15 }));
}

export function initMagnetic(gsap) {
  document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("mousemove", (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: "power2.out" });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    });
  });
}

export function initRipple() {
  document.querySelectorAll(".btn, .carousel-btn, .social-icon").forEach((el) => {
    el.style.position = el.style.position || "relative";
    el.style.overflow = "hidden";
    el.addEventListener("click", (event) => {
      const rect = el.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height) * 1.4;
      ripple.style.cssText = `
        position:absolute; border-radius:999px; pointer-events:none;
        width:${size}px; height:${size}px;
        left:${event.clientX - rect.left - size / 2}px;
        top:${event.clientY - rect.top - size / 2}px;
        background: radial-gradient(circle, rgba(57, 255, 20,0.35), transparent 70%);
        transform: scale(0); opacity: 1;
      `;
      el.appendChild(ripple);
      ripple.animate(
        [
          { transform: "scale(0)", opacity: 1 },
          { transform: "scale(1)", opacity: 0 },
        ],
        { duration: 600, easing: "cubic-bezier(0.16,1,0.3,1)" },
      ).onfinish = () => ripple.remove();
    });
  });
}
