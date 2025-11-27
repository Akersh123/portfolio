import { gsap } from "gsap";
export function initGalleryFree({
    containerSelector = ".skills-grid", // container holding .skill-item
    itemSelector = ".skill-item",
    globalStrength = 0.9, // multiplier for movement
    maxTranslate = 36, // px maximum translation (per axis)
    maxRotate = 12, // degrees
    maxScale = 1.12, // max scale when pointer over
    ease = "power3.out",
} = {}) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.debug(
            "[initGalleryFree] container not found:",
            containerSelector
        );
        return;
    }

    // reduce motion support
    const REDUCE_MOTION =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (REDUCE_MOTION) return;

    const items = Array.from(container.querySelectorAll(itemSelector));
    if (!items.length) {
        console.debug("[initGalleryFree] no items found:", itemSelector);
        return;
    }

    // cleanup previous handlers
    if (initGalleryFree._moveHandler) {
        container.removeEventListener(
            "pointermove",
            initGalleryFree._moveHandler
        );
        container.removeEventListener(
            "pointerleave",
            initGalleryFree._leaveHandler
        );
        cancelAnimationFrame(initGalleryFree._rafId || 0);
        initGalleryFree._moveHandler = null;
        initGalleryFree._leaveHandler = null;
        initGalleryFree._rafId = null;
    }

    const pointer = { x: 0, y: 0 };
    let rafId = null;

    // pointer move — store absolute pointer coords relative to document
    const onPointerMove = (e) => {
        if (e.isPrimary === false) return;
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        if (!rafId) {
            rafId = requestAnimationFrame(tick);
            initGalleryFree._rafId = rafId;
        }
    };

    // pointer leave — reset transforms
    const onPointerLeave = () => {
        items.forEach((el) =>
            gsap.to(el, {
                x: 0,
                y: 0,
                rotationY: 0,
                rotationX: 0,
                scale: 1,
                duration: 0.55,
                ease,
            })
        );
    };

    // main tick — compute transform per item using dx/dy from pointer to element center
    function tick() {
        rafId = null;
        initGalleryFree._rafId = null;

        items.forEach((el) => {
            const depthAttr = parseFloat(el.dataset.depth);
            const depth = Number.isFinite(depthAttr) ? depthAttr : 0.08; // default depth

            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = pointer.x - centerX; // positive => pointer is to right of element
            const dy = pointer.y - centerY; // positive => pointer is below element

            // normalize by viewport or container for consistent motion magnitude
            // use container diagonal to normalize
            const containerRect = container.getBoundingClientRect();
            const norm = Math.max(containerRect.width, containerRect.height);

            // proportional movement ( preserves sign => moves in all directions)
            const txUnclamped =
                (dx / norm) * maxTranslate * (1 + depth * 6) * globalStrength;
            const tyUnclamped =
                (dy / norm) * maxTranslate * (1 + depth * 6) * globalStrength;

            // clamp
            const tx = Math.max(
                -maxTranslate,
                Math.min(maxTranslate, txUnclamped)
            );
            const ty = Math.max(
                -maxTranslate,
                Math.min(maxTranslate, tyUnclamped)
            );

            // rotation based on dx/dy sign
            const rotY = Math.max(
                -maxRotate,
                Math.min(maxRotate, (dx / norm) * maxRotate * (1 + depth * 4))
            );
            const rotX = Math.max(
                -maxRotate,
                Math.min(maxRotate, -(dy / norm) * maxRotate * (1 + depth * 4))
            );

            // scale stronger when pointer is very close to element (optional)
            // closer => larger scale; using distance to element center
            const dist = Math.sqrt(dx * dx + dy * dy);
            const proximity = Math.max(0, 1 - dist / (norm * 0.6)); // 1 when very close, 0 far
            const scale =
                1 + (maxScale - 1) * Math.min(1, proximity * (depth * 6));

            // apply animation
            gsap.to(el, {
                x: tx,
                y: ty,
                rotationY: rotY,
                rotationX: rotX,
                scale,
                duration: 0.45,
                ease,
                overwrite: true,
            });
        });
    }

    // attach listeners
    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave);

    initGalleryFree._moveHandler = onPointerMove;
    initGalleryFree._leaveHandler = onPointerLeave;
    initGalleryFree._rafId = rafId;

    console.debug("[initGalleryFree] initialized with", items.length, "items");
}
