// resources/js/hero-anim.js
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, SplitText, MotionPathPlugin);

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

export function initScrollToTopWithProgress({
    buttonId = "scrollToTop",
    circleSelector = ".progress-ring__circle",
    showAfter = 220,
} = {}) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;
    const circle = btn.querySelector(circleSelector);
    if (!circle) return;

    const r = Number(circle.getAttribute("r") || 28);
    const circumference = 2 * Math.PI * r;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    function setProgress(ratio) {
        const clamped = Math.max(0, Math.min(1, ratio));
        const dash = circumference - circumference * clamped;
        circle.style.strokeDashoffset = String(dash);
    }

    let ticking = false;
    function onScrollUpdate() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const scrollTop = window.scrollY || window.pageYOffset;
            const docHeight =
                Math.max(
                    document.documentElement.scrollHeight,
                    document.body.scrollHeight
                ) - window.innerHeight;
            const progress = docHeight > 0 ? scrollTop / docHeight : 0;
            setProgress(progress);
            if (scrollTop > showAfter) btn.classList.add("show");
            else btn.classList.remove("show");
            ticking = false;
        });
    }

    window.addEventListener("scroll", onScrollUpdate, { passive: true });
    window.addEventListener("resize", onScrollUpdate, { passive: true });
    onScrollUpdate();

    const hasGSAP = !!(window.gsap && window.gsap.ScrollToPlugin);
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (hasGSAP) {
            window.gsap.to(window, {
                duration: 0.9,
                ease: "power3.inOut",
                scrollTo: { y: 0, autoKill: true },
            });
        } else if ("scrollBehavior" in document.documentElement.style) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const start = window.scrollY || window.pageYOffset;
            const dur = 700,
                startTime = performance.now();
            function frame(now) {
                const t = Math.min(1, (now - startTime) / dur);
                const eased = 1 - Math.pow(1 - t, 3);
                window.scrollTo(0, Math.round(start * (1 - eased)));
                if (t < 1) requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
        }
    });

    btn.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            btn.click();
        }
    });

    // debug
    console.debug(
        "[scrollToTop] init done; r:",
        r,
        "circumference:",
        circumference
    );
    return { setProgress };
}

export function initScrollRocketBobbing({
    buttonSelector = "#scrollToTop",
    rocketSelector = "#page-rocket",
    bobY = -6, // px upward travel (negative = up)
    rotateDeg = -2, // small tilt while bobbing
    duration = 1.05, // seconds
} = {}) {
    const btn = document.querySelector(buttonSelector);
    if (!btn)
        return console.debug(
            "[initScrollRocketBobbing] button not found:",
            buttonSelector
        );

    const rocket = btn.querySelector(rocketSelector);
    if (!rocket)
        return console.debug(
            "[initScrollRocketBobbing] rocket not found:",
            rocketSelector
        );

    // Respect prefers-reduced-motion: use CSS fallback
    const REDUCE =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (REDUCE) {
        btn.querySelector(".scroll-core")?.classList.add("rocket-fallback");
        return;
    }

    // Clean up previous timeline if re-initialized
    if (initScrollRocketBobbing._tl) {
        try {
            initScrollRocketBobbing._tl.kill();
        } catch (e) {}
        initScrollRocketBobbing._tl = null;
    }
    if (initScrollRocketBobbing._observer) {
        initScrollRocketBobbing._observer.disconnect();
        initScrollRocketBobbing._observer = null;
    }

    // create a repeating timeline but start paused — we will play only when button has .show
    const tl = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
    tl.to(rocket, {
        y: bobY,
        rotation: rotateDeg,
        duration,
        ease: "sine.inOut",
    });

    initScrollRocketBobbing._tl = tl;

    // If button already visible (.show), play
    if (btn.classList.contains("show")) tl.play();

    // Observe class changes to toggle animation when .show gets added/removed
    const mo = new MutationObserver((mutations) => {
        for (const m of mutations) {
            if (m.attributeName === "class") {
                const has = btn.classList.contains("show");
                if (has && tl.paused()) tl.play();
                else if (!has && !tl.paused()) tl.pause();
            }
        }
    });

    mo.observe(btn, { attributes: true, attributeFilter: ["class"] });
    initScrollRocketBobbing._observer = mo;

    // Also toggle on page load / initial state (in case the button is already shown)
    // If you want the bob always running even when hidden, remove observer logic above and call tl.play() directly.
    console.debug("[initScrollRocketBobbing] initialized (GSAP bob)", {
        bobY,
        rotateDeg,
        duration,
    });
}

export function initScrollReveal() {
    const section = document.querySelector("#about-section");
    const line = document.querySelector("#about-scroll-line");
    if (!section || !line) return;

    // If already split before (Livewire / multiple inits), revert
    if (line._aboutSplit) {
        line._aboutSplit.revert();
    }

    // Split into characters
    const split = new SplitText(line, { type: "chars" });
    line._aboutSplit = split;
    const chars = split.chars;

    // start all letters as grey
    gsap.set(chars, { color: "#eeeeee" }); // gray-500-ish

    // timeline controlled by scroll
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top", // when about hits top of viewport
            end: "+=1000", // how much scroll to finish the effect (tweak)
            scrub: true, // tie progress to scroll
            pin: true, // ⬅️ keep this section fixed while scrolling
            pinSpacing: true, // leave space so layout doesn’t jump
            // markers: true,
        },
    });

    tl.to(chars, {
        color: "#000000", 
        ease: "none",
        stagger: {
            each: 0.04, // time between each letter's change
            from: "start", // left to right
        },
    });

    ScrollTrigger.refresh();
}
