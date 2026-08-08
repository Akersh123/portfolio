import { PROJECTS, slugify } from "../content.js";

function buildLines(project) {
  const lines = [
    { type: "heading", text: `# ${project.title}` },
    { type: "text", text: project.description },
    { type: "key", label: "category", value: project.category },
    { type: "key", label: "stack", value: `[${project.stack.join(", ")}]` },
    { type: "link", label: "github", href: project.github },
    { type: "link", label: "live demo", href: project.demo },
  ];
  return lines;
}

function lineElement(line) {
  const el = document.createElement("p");
  el.className = `term-line term-${line.type}`;
  if (line.type === "heading" || line.type === "text") {
    el.textContent = line.text;
  } else if (line.type === "key") {
    el.innerHTML = `<span class="term-key-label">${line.label}:</span> <span class="term-key-value">${line.value}</span>`;
  } else if (line.type === "link") {
    el.innerHTML = `<span class="term-key-label">${line.label}:</span> <a href="${line.href}" class="term-link-value">${line.href === "#" ? "(add link)" : line.href}</a>`;
  }
  return el;
}

export function initTerminalProjects(gsap) {
  const window_ = document.querySelector(".terminal-window");
  const output = document.getElementById("terminal-output");
  const entries = [...document.querySelectorAll(".terminal-entry")];
  const activePath = document.getElementById("terminal-active-path");
  if (!window_ || !output || !entries.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function render(index) {
    const project = PROJECTS[index];
    if (!project) return;

    entries.forEach((entry) => entry.classList.toggle("is-active", Number(entry.dataset.index) === index));
    if (activePath) activePath.textContent = `${slugify(project.title)}/readme.md`;

    output.innerHTML = "";
    const els = buildLines(project).map(lineElement);
    els.forEach((el) => output.appendChild(el));

    if (reduceMotion) {
      gsap.set(els, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      els,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: "power2.out" },
    );
  }

  entries.forEach((entry) => {
    entry.addEventListener("click", () => render(Number(entry.dataset.index)));
  });

  let hasRendered = false;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !hasRendered) {
        hasRendered = true;
        render(0);
        observer.disconnect();
      }
    },
    { threshold: 0.2 },
  );
  observer.observe(window_);
}
