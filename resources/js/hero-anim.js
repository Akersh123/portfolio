// resources/js/hero-anim.js
import { gsap } from "gsap";

const REDUCE_MOTION =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// -------------------- HERO TEXT --------------------
// inside resources/js/hero-anim.js (replace the existing animateHeroText function)
export function animateHeroText() {
    const title = document.getElementById("hero-title");
    if (!title) return;

    // split once
    if (!title.dataset.split) {
        const text = title.textContent.trim();
        const chars = [...text].map((ch) =>
            ch === " "
                ? `<span class="char whitespace">&nbsp;</span>`
                : `<span class="char inline-block opacity-0">${ch}</span>`
        );
        title.innerHTML = chars.join("");
        title.dataset.split = "true";
    }

    const chars = title.querySelectorAll(".char");

    // reset CSS variables used for the neon effect
    title.style.setProperty("--rx", "0px");
    title.style.setProperty("--ry", "0px");
    title.style.setProperty("--glow-small", "8px");
    title.style.setProperty("--glow-large", "24px");

    // reset characters to initial rotated state
    gsap.set(chars, {
        opacity: 0,
        rotateY: -90,
        transformOrigin: "50% 50%",
    });

    // entrance: rotate letters in with stagger
    gsap.to(chars, {
        opacity: 1,
        rotateY: 0,
        duration: 0.7,
        ease: "back.out(1.8)",
        stagger: 0.04,
    });

    // neon RGB-split + pulse timeline (animates CSS vars)
    // small chromatic offset oscillation
    gsap.to(title, {
        // horizontal/vertical offset for colored shadows (creates RGB-split)
        "--rx": "6px", // will animate from 0px -> 6px
        "--ry": "2px",
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
    });

    // pulse glow intensity (small -> large)
    gsap.to(title, {
        "--glow-small": "14px",
        "--glow-large": "48px",
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.3,
    });

    // subtle additional flicker on entire title to feel neon-y
    gsap.to(title, {
        opacity: 0.98,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.6,
    });
}

// -------------------- MOUSE TRACKER --------------------
export function initMouseTracker() {
    const tracker = document.getElementById("mouse-tracker");

    if (!tracker) {
        console.warn("[mouse-tracker] not found");
        return;
    }

    if (REDUCE_MOTION) {
        tracker.style.opacity = 0.7;
        return;
    }

    tracker.style.transform = "translate(-50%, -50%)";
    tracker.style.willChange = "transform, opacity, filter";

    // inner blob
    let inner = tracker.querySelector(".mouse-inner");
    if (!inner) {
        inner = document.createElement("div");
        inner.className = "mouse-inner";
        inner.style.position = "absolute";
        inner.style.left = "50%";
        inner.style.top = "50%";
        inner.style.width = "45%";
        inner.style.height = "45%";
        inner.style.borderRadius = "50%";
        inner.style.transform = "translate(-50%, -50%)";
        inner.style.background =
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.1))";
        tracker.appendChild(inner);
    }

    gsap.set(tracker, {
        xPercent: -50,
        yPercent: -50,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    });

    let lastX = null,
        lastY = null,
        lastTime = null;

    const handler = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const now = performance.now();

        let speed = 0;
        if (lastX != null) {
            const dx = x - lastX;
            const dy = y - lastY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const dt = now - lastTime || 16;
            speed = dist / dt;
        }

        lastX = x;
        lastY = y;
        lastTime = now;

        // main blob follow
        gsap.to(tracker, {
            x,
            y,
            duration: 0.25,
            ease: "power3.out",
        });

        // dynamic intensity based on speed
        const t = Math.min(Math.max((speed - 0.1) * 5, 0), 1);

        gsap.to(tracker, {
            scale: 1 + 0.25 * t,
            opacity: 0.55 + 0.4 * t,
            filter: `blur(${18 - t * 8}px)`,
            duration: 0.35,
        });

        gsap.to(inner, {
            scale: 1 + 0.45 * t,
            opacity: 0.5 + 0.4 * t,
            duration: 0.35,
        });
    };

    // prevent multiple listeners
    if (initMouseTracker._handler) {
        window.removeEventListener("mousemove", initMouseTracker._handler);
    }

    initMouseTracker._handler = handler;
    window.addEventListener("mousemove", handler, { passive: true });

    console.log("[mouse-tracker] initialized");
}
