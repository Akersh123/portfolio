import { gsap } from 'gsap';

export function animateCards(selector = '#project-cards .project-card') {
  const cards = document.querySelectorAll(selector);
  if (!cards.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    cards.forEach(el => el.style.opacity = 1);
    return;
  }

  gsap.fromTo(cards,
    { opacity: 0, y: 30, scale: 0.98 },
    { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out' }
  );
}

// run once on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  try { animateCards(); } catch (e) { /* ignore */ }
});

// re-run after Livewire updates (Livewire provides global `Livewire`)
document.addEventListener('livewire:load', () => {
  if (window.Livewire) {
    window.Livewire.hook('message.processed', (message, component) => {
      try { animateCards(); } catch (e) { /* ignore */ }
    });
  }
});
