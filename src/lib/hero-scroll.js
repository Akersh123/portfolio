export function updateHeroScrollCamera(gsap, ScrollTrigger) {
  const hero = document.getElementById("hero");
  const canvasWrap = document.getElementById("hero-canvas");
  if (!hero || !canvasWrap) return;

  gsap.to(canvasWrap, {
    scale: 1.15,
    opacity: 0.3,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}
