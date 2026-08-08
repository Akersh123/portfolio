export function initLoader(gsap, { onComplete } = {}) {
  const screen = document.getElementById("loading-screen");
  const fill = document.getElementById("loading-bar-fill");
  const percent = document.getElementById("loading-percent");
  if (!screen || !fill || !percent) {
    onComplete?.();
    return;
  }

  const state = { value: 0 };
  const tween = gsap.to(state, {
    value: 92,
    duration: 1.6,
    ease: "power1.out",
    onUpdate: () => {
      const v = Math.round(state.value);
      fill.style.width = `${v}%`;
      percent.textContent = `${v}%`;
    },
  });

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    tween.kill();
    gsap.to(state, {
      value: 100,
      duration: 0.4,
      onUpdate: () => {
        const v = Math.round(state.value);
        fill.style.width = `${v}%`;
        percent.textContent = `${v}%`;
      },
      onComplete: () => {
        gsap.to(screen, {
          opacity: 0,
          duration: 0.7,
          delay: 0.15,
          ease: "power2.out",
          onComplete: () => {
            screen.remove();
            document.body.classList.add("is-loaded");
            onComplete?.();
          },
        });
      },
    });
  };

  if (document.readyState === "complete") {
    setTimeout(finish, 600);
  } else {
    window.addEventListener("load", () => setTimeout(finish, 400));
    setTimeout(finish, 3200);
  }
}
