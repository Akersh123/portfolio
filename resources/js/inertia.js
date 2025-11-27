import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin)   

/**
 * initSkillDragReorder
 * @param {string} selector - selector for draggable items (default ".skill-item")
 * @param {string|HTMLElement} container - container selector or element (default "#project-managed-cards")
 * @param {object} opts - options { gap, snapThreshold, animationConfig }
 */
export function initSkillDragReorder(
  selector = ".skill-item",
  container = "#project-managed-cards",
  opts = {}
) {
  const settings = Object.assign(
    {
      gap: 8, // spacing tolerance when computing layout
      snapThreshold: 100, // max distance to snap into nearest slot
      animationConfig: { duration: 0.25, ease: "power2.out" },
    },
    opts
  );

  const root = typeof container === "string" ? document.querySelector(container) : container;
  if (!root) return;

  let items = Array.from(root.querySelectorAll(selector));

  // store current layout slots (center positions)
  let slots = [];

  // store Draggable instances to kill/recreate as needed
  let draggables = [];

  function refreshItems() {
    items = Array.from(root.querySelectorAll(selector));
    items.forEach((el, i) => el.setAttribute("data-order", i));
  }

  function calculateSlots() {
    // calculate bounding boxes (use element positions in normal flow)
    refreshItems();
    slots = items.map((el) => {
      const r = el.getBoundingClientRect();
      // record center relative to container's top-left
      const ctnR = root.getBoundingClientRect();
      return {
        el,
        left: r.left - ctnR.left,
        top: r.top - ctnR.top,
        width: r.width,
        height: r.height,
        cx: r.left - ctnR.left + r.width / 2,
        cy: r.top - ctnR.top + r.height / 2,
      };
    });
  }

  function animateToLayout() {
    // animate everything to its natural position in the DOM using getBoundingClientRect trick
    const state = items.map((el) => {
      const rect = el.getBoundingClientRect();
      return { el, rect };
    });

    // force layout (no-op)
    root.offsetHeight;

    items.forEach((el, i) => {
      const old = state.find((s) => s.el === el);
      if (!old) return;
      const newRect = el.getBoundingClientRect();
      const dx = old.rect.left - newRect.left;
      const dy = old.rect.top - newRect.top;

      // animate from previous position to new
      gsap.fromTo(
        el,
        { x: dx, y: dy },
        { x: 0, y: 0, duration: settings.animationConfig.duration, ease: settings.animationConfig.ease }
      );
    });
  }

  function killDraggables() {
    draggables.forEach((d) => {
      try { d.kill(); } catch (e) {}
    });
    draggables = [];
  }

  function createDraggables() {
    killDraggables();
    calculateSlots();

    items.forEach((item) => {
      // ensure transform is clean
      gsap.set(item, { x: 0, y: 0, zIndex: 0, clearProps: "all" });

      const dd = Draggable.create(item, {
        type: "x,y",
        inertia: true,
        edgeResistance: 0.2,
        bounds: root,
        cursor: "grab",
        activeCursor: "grabbing",
        onPress() {
          // bring to front
          gsap.set(this.target, { zIndex: 999 });
          gsap.to(this.target, { scale: 1.08, duration: 0.12 });
          // record pick up layout so other elements can animate away
          calculateSlots();
        },
        onDrag() {
          // while dragging, find the nearest slot index by comparing centers
          const ctnR = root.getBoundingClientRect();
          const tR = this.target.getBoundingClientRect();
          const cx = tR.left - ctnR.left + tR.width / 2;
          const cy = tR.top - ctnR.top + tR.height / 2;

          // compute distances to slot centers
          const distances = slots.map((s) => Math.hypot(cx - s.cx, cy - s.cy));
          const nearestIdx = distances.indexOf(Math.min(...distances));

          // visually move other elements aside to show where the dragged element would land
          items.forEach((other) => {
            if (other === this.target) return;
            const otherIdx = items.indexOf(other);
            const targetIdx = items.indexOf(this.target);
            // if nearest slot is different from current index, compute a temporary new order
            if (nearestIdx !== -1 && nearestIdx !== otherIdx) {
              // compute where other should move to in DOM when dropped
              // we won't reorder DOM while dragging — just animate neighbors slightly
              // if the other element is between targetIdx and nearestIdx, shift it
              let shift = 0;
              if (targetIdx < nearestIdx && otherIdx > targetIdx && otherIdx <= nearestIdx) shift = -1;
              if (targetIdx > nearestIdx && otherIdx >= nearestIdx && otherIdx < targetIdx) shift = 1;
              const s = slots[otherIdx];
              if (s) {
                const toX = shift * (s.width + settings.gap);
                gsap.to(other, { x: toX, duration: 0.18, ease: "power2.out" });
              }
            } else {
              // reset
              gsap.to(other, { x: 0, duration: 0.18, ease: "power2.out" });
            }
          });
        },
        onRelease() {
          gsap.to(this.target, { scale: 1, duration: 0.12 });

          // compute drop center and nearest slot
          const ctnR = root.getBoundingClientRect();
          const tR = this.target.getBoundingClientRect();
          const cx = tR.left - ctnR.left + tR.width / 2;
          const cy = tR.top - ctnR.top + tR.height / 2;

          const distances = slots.map((s) => Math.hypot(cx - s.cx, cy - s.cy));
          let nearestIdx = distances.indexOf(Math.min(...distances));
          const minDist = Math.min(...distances);

          // if too far from any slot, snap back to original spot
          if (minDist > settings.snapThreshold) {
            // reset neighbors and animate drag target back
            items.forEach((other) => gsap.to(other, { x: 0, duration: 0.2, ease: "power2.out" }));
            gsap.to(this.target, { x: 0, y: 0, duration: 0.28, ease: "power3.out", onComplete: () => animateToLayout() });
            gsap.set(this.target, { zIndex: 0 });
            return;
          }

          // determine original index and new index
          const originalIndex = items.indexOf(this.target);
          const newIndex = nearestIdx;

          // if same index, just animate others back
          if (originalIndex === newIndex) {
            items.forEach((other) => gsap.to(other, { x: 0, duration: 0.18, ease: "power2.out" }));
            gsap.to(this.target, { x: 0, y: 0, duration: 0.25, ease: "power3.out", onComplete: () => { animateToLayout(); gsap.set(this.target, { zIndex: 0 }); } });
            return;
          }

          // Reorder DOM: insert dragged element at newIndex
          // first remove temporary transforms
          items.forEach((other) => gsap.set(other, { x: 0 }));
          if (newIndex >= items.length) {
            root.appendChild(this.target);
          } else {
            const refEl = items[newIndex];
            // if moving right (originalIndex < newIndex), we want to insert after the refEl
            if (originalIndex < newIndex) {
              root.insertBefore(this.target, refEl.nextSibling);
            } else {
              root.insertBefore(this.target, refEl);
            }
          }

          // refresh items array and animate to new layout
          refreshItems();
          animateToLayout();

          // set zIndex back
          gsap.set(this.target, { zIndex: 0 });

          // persist order: emit custom event and attempt Livewire.emit if available
          const order = items.map((el) => el.getAttribute("data-order") ?? Array.from(items).indexOf(el));
          const detail = { order: order.map((_, i) => root.children[i].getAttribute("aria-label") || root.children[i].dataset.id || i) };

          // dispatch a DOM event that apps can listen to
          root.dispatchEvent(new CustomEvent("skillsReordered", { detail }));

          // If Livewire is present, try to emit event 'skillsReordered' with the new order
          try {
            if (window.Livewire && typeof window.Livewire.emit === "function") {
              window.Livewire.emit("skillsReordered", detail);
            }
          } catch (e) {
            // ignore
          }
        },
        onThrowUpdate() {
          // optional: keep neighbor animation in sync while inertia throws
        },
      })[0];

      draggables.push(dd);
    });
  }

  // initial setup
  refreshItems();
  calculateSlots();
  createDraggables();

  // Recalculate on window resize or when called externally
  function recalibrate() {
    // kill then recreate to avoid stale bounds
    calculateSlots();
    createDraggables();
  }

  window.addEventListener("resize", () => {
    // small debounce
    clearTimeout(window.__skillDragResize);
    window.__skillDragResize = setTimeout(recalibrate, 120);
  });

  // provide API to caller
  return {
    recalibrate,
    destroy() {
      killDraggables();
      window.removeEventListener("resize", recalibrate);
    },
  };
}
