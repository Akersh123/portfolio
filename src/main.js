import "./styles.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { renderTemplate } from "./content.js";
import { initNav } from "./lib/nav.js";
import { initLoader } from "./lib/loader.js";
import { initLenis } from "./lib/lenis-setup.js";
import { initCursor, initMagnetic, initRipple } from "./lib/cursor.js";
import { initStarfield } from "./lib/starfield.js";
import { updateHeroScrollCamera } from "./lib/hero-scroll.js";
import { initTerminalProjects } from "./lib/terminal-projects.js";
import {
  initReveals,
  initCounters,
  initTilt,
  initHexFloat,
  initHeroIntro,
  initTypewriter,
  initHeaderScroll,
} from "./lib/scroll-fx.js";
import { initCarousel } from "./lib/carousel.js";
import { initContactParticles, initContactForm } from "./lib/contact-fx.js";
import { initEasterEgg } from "./lib/easter-egg.js";

gsap.registerPlugin(ScrollTrigger);

const app = document.getElementById("app");
app.innerHTML = renderTemplate();

initNav();
initLenis(gsap, ScrollTrigger);
initCursor(gsap);
initMagnetic(gsap);
initRipple();

initStarfield();
updateHeroScrollCamera(gsap, ScrollTrigger);

initTerminalProjects(gsap);
initCarousel(gsap);

initReveals(gsap, ScrollTrigger);
initCounters(gsap, ScrollTrigger);
initTilt(gsap);
initHexFloat(gsap, ScrollTrigger);
initHeaderScroll(gsap, ScrollTrigger);

initContactParticles();
initContactForm();
initEasterEgg();

initLoader(gsap, {
  onComplete: () => {
    initHeroIntro(gsap);
    initTypewriter();
  },
});

window.addEventListener("load", () => ScrollTrigger.refresh());
document.fonts?.ready.then(() => ScrollTrigger.refresh());
