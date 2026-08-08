const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function initEasterEgg() {
  console.log(
    "%cAkersh Bhaskar %c— Laravel Developer / Project Lead\nLooking for the source? github.com — try the Konami code 👀",
    "color:#39ff14;font-size:16px;font-weight:bold;",
    "color:#94a3b8;font-size:12px;",
  );

  const badge = document.getElementById("easter-egg");
  let cursor = 0;

  window.addEventListener("keydown", (event) => {
    const key = event.key;
    cursor = key === KONAMI[cursor] ? cursor + 1 : key === KONAMI[0] ? 1 : 0;
    if (cursor === KONAMI.length) {
      cursor = 0;
      badge?.classList.add("is-visible");
      document.body.animate(
        [{ filter: "hue-rotate(0deg)" }, { filter: "hue-rotate(360deg)" }],
        { duration: 1200, easing: "ease-in-out" },
      );
      setTimeout(() => badge?.classList.remove("is-visible"), 4000);
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.target.matches("input, textarea")) return;
    const map = { "1": "#hero", "2": "#about", "3": "#skills", "4": "#projects", "5": "#timeline", "6": "#contact" };
    const id = map[event.key];
    if (id) document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  });
}
