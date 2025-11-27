// resources/js/app.js
import "./bootstrap";
import "./gsap-init";
import {
    animateHeroText,
    initMouseTracker,
    initScrollToTopWithProgress,
    initScrollRocketBobbing,
    initScrollReveal,
} from "./hero-anim";
import { initRotatingSubtitle } from "./rotating-subtitle";
import { initGalleryFree } from "./skill-effect";
import { initSkillDragReorder } from "./inertia";

let skillDragHandle = null;
function initAll() {
    try {
        animateHeroText();
        initMouseTracker();
        initScrollToTopWithProgress();
        initScrollRocketBobbing();
        initGalleryFree({
            containerSelector: "#project-managed-cards",
            itemSelector: ".skill-item",
            globalStrength: 0.9,
            maxTranslate: 44,
            maxRotate: 12,
            maxScale: 1.14,
        });
        initScrollReveal();

        if (
            skillDragHandle &&
            typeof skillDragHandle.recalibrate === "function"
        ) {
            skillDragHandle.recalibrate();
        } else {
            // destroy any stray instance on DOM container first (defensive)
            const root = document.querySelector("#project-managed-cards");
            if (
                root &&
                root.__skillDragInstance &&
                typeof root.__skillDragInstance.destroy === "function"
            ) {
                root.__skillDragInstance.destroy();
            }
            skillDragHandle = initSkillDragReorder(
                ".skill-item",
                "#project-managed-cards",
                {
                    snapThreshold: 140,
                    animationConfig: { duration: 0.28, ease: "power2.out" },
                }
            );
        }
    } catch (err) {
        console.error("initAll error:", err);
    }
}

// DOM ready init
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
} else {
    initAll();
}

// Livewire init/re-init after updates (if Livewire present)
document.addEventListener("livewire:load", () => {
    initAll();

    if (window.Livewire) {
        // message.processed runs frequently; prefer recalibrate instead of recreate
        window.Livewire.hook("message.processed", (message, component) => {
            try {
                if (
                    skillDragHandle &&
                    typeof skillDragHandle.recalibrate === "function"
                ) {
                    skillDragHandle.recalibrate();
                } else {
                    // fallback: re-init
                    initAll();
                }
                initScrollReveal();
                ScrollTrigger.refresh();
            } catch (e) {
                console.error("Livewire hook error:", e);
            }
        });
    }
});

function initPercentageLoader() {
    const loader = document.getElementById("page-loader");
    const percentEl = document.getElementById("loader-percent");
    if (!loader || !percentEl) return;

    let progress = 0;

    function updateProgress(value) {
        progress = Math.min(100, value);
        percentEl.textContent = `${Math.floor(progress)}%`;
    }

    function animateTo(value, duration = 400) {
        const start = progress;
        const diff = value - start;
        const startTime = performance.now();

        function frame(now) {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / duration, 1);
            updateProgress(start + diff * t);
            if (t < 1) requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
    }

    // Preload hero image
    const heroImg =
        document.querySelector("#hero img#hero-image") ||
        document.querySelector("#hero img");

    let imageDone = false;
    let windowDone = false;

    if (heroImg && heroImg.decode) {
        heroImg.decode().then(() => {
            imageDone = true;
            animateTo(60); // hero loaded
            checkFinish();
        });
    } else {
        imageDone = true;
        animateTo(60);
    }

    window.addEventListener("load", () => {
        windowDone = true;
        animateTo(90); // assets loaded
        checkFinish();
    });

    function checkFinish() {
        if (imageDone && windowDone) {
            setTimeout(() => {
                animateTo(100, 500);
                setTimeout(() => {
                    loader.classList.add("hidden");
                }, 600);
            }, 300);
        }
    }

    // fallback auto-complete in case something hangs
    setTimeout(() => {
        animateTo(100);
        loader.classList.add("hidden");
    }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
    initPercentageLoader();
    initRotatingSubtitle();
});
