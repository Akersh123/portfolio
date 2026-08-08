import { splitChars } from "./split-text.js";

const TAGLINES = [
  "Build Scalable Applications.",
  "Lead Production Deployments.",
  "Ship Premium Laravel Apps.",
];

export function initReveals(gsap, ScrollTrigger) {
  gsap.utils.toArray(".reveal").forEach((el, i) => {
    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: (i % 3) * 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      },
    );
  });
}

export function initCounters(gsap, ScrollTrigger) {
  gsap.utils.toArray(".counter").forEach((el) => {
    const target = Number(el.dataset.target || 0);
    gsap.fromTo(
      el,
      { innerText: 0 },
      {
        innerText: target,
        duration: 1.8,
        snap: { innerText: 1 },
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      },
    );
  });
}

export function initTilt(gsap) {
  document.querySelectorAll(".tilt-panel").forEach((panel) => {
    panel.addEventListener("mousemove", (event) => {
      const rect = panel.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(panel, { rotateY: x * 8, rotateX: -y * 8, duration: 0.4, ease: "power2.out" });
    });
    panel.addEventListener("mouseleave", () => {
      gsap.to(panel, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
    });
  });
}

export function initHexFloat(gsap, ScrollTrigger) {
  gsap.utils.toArray(".hex-card").forEach((card, i) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 50, rotateX: -20 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 85%" },
      },
    );
  });
}

export function initHeroIntro(gsap) {
  const lines = document.querySelectorAll("[data-split]");
  const revealUps = document.querySelectorAll(".hero-content .reveal-up");
  const tl = gsap.timeline({ delay: 0.15 });

  lines.forEach((line) => {
    const chars = splitChars(line);
    tl.from(
      chars,
      {
        yPercent: 120,
        opacity: 0,
        rotateZ: 6,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.025,
      },
      "<0.05",
    );
  });

  tl.fromTo(
    revealUps,
    { y: 24, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" },
    "-=0.5",
  );
}

export function initTypewriter() {
  const el = document.getElementById("typewriter");
  if (!el) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    el.textContent = TAGLINES[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const phrase = TAGLINES[phraseIndex];
    if (!deleting) {
      charIndex += 1;
      el.textContent = phrase.slice(0, charIndex);
      if (charIndex === phrase.length) {
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
      setTimeout(tick, 55);
    } else {
      charIndex -= 1;
      el.textContent = phrase.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % TAGLINES.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, 28);
    }
  }
  tick();
}

export function initHeaderScroll(gsap, ScrollTrigger) {
  const header = document.getElementById("site-header");
  if (!header) return;
  let lastY = window.scrollY;

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const goingDown = self.direction === 1;
      const scrolled = window.scrollY > 80;
      gsap.to(header, {
        yPercent: goingDown && scrolled ? -120 : 0,
        duration: 0.4,
        ease: "power2.out",
      });
      header.classList.toggle("is-scrolled", scrolled);
      lastY = window.scrollY;
    },
  });
}
