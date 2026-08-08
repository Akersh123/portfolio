import Lenis from "lenis";

export function initLenis(gsap, ScrollTrigger) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return null;

  const lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -60, duration: 1.4 });
    });
  });

  return lenis;
}
