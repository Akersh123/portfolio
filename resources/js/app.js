// resources/js/app.js
import "./bootstrap";
import "./gsap-init";
import { animateHeroText, initMouseTracker } from "./hero-anim";
import { initRotatingSubtitle } from "./rotating-subtitle";

function initAll() {
    try {
        animateHeroText();
        initMouseTracker();
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

    // also re-run after Livewire finishes processing messages
    if (window.Livewire) {
        window.Livewire.hook("message.processed", () => {
            initAll();
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
