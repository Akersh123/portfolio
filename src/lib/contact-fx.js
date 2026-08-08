export function initContactParticles() {
  const canvas = document.getElementById("contact-particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width = 0;
  let height = 0;
  let particles = [];
  let rafId = 0;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = rect.height;
    const count = Math.min(70, Math.floor((width * height) / 18000));
    particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.4,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(57, 255, 20, 0.6)";
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const a = particles[i];
        const b = particles[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 110) {
          ctx.strokeStyle = `rgba(0, 255, 127, ${0.18 * (1 - dist / 110)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    rafId = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);

  if (!reduceMotion) {
    draw();
  } else {
    ctx.clearRect(0, 0, width, height);
  }

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) {
      cancelAnimationFrame(rafId);
    } else if (!reduceMotion) {
      draw();
    }
  });
  observer.observe(canvas);
}

/* Front-end only demo submission — wire this up to a real Laravel route
   (e.g. POST /contact) before going to production. */
export function initContactForm() {
  const form = document.getElementById("contact-form");
  const button = document.getElementById("contact-submit");
  const status = document.getElementById("contact-status");
  if (!form || !button || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (button.classList.contains("is-loading")) return;

    button.classList.add("is-loading");
    status.textContent = "";

    setTimeout(() => {
      button.classList.remove("is-loading");
      button.classList.add("is-success");
      status.textContent = "Message captured locally — connect this form to your Laravel backend to deliver it.";

      setTimeout(() => {
        button.classList.remove("is-success");
        form.reset();
      }, 2400);
    }, 1100);
  });
}
