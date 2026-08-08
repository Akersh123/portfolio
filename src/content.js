import { iconMarkup } from "./lib/icons.js";

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#timeline", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export const STATS = [
  { target: 2, suffix: "+", label: "Years Experience" },
  { target: 20, suffix: "+", label: "Projects Shipped" },
  { target: 9, suffix: "", label: "Clients Served" },
  { target: 14, suffix: "+", label: "Technologies" },
];

export const SKILLS = [
  { name: "Laravel", level: "Advanced", exp: "2+ yrs", size: "lg", desc: "Core framework for scalable backend architecture, queues, and Eloquent-driven data modeling." },
  { name: "PHP", level: "Advanced", exp: "2+ yrs", size: "wide", desc: "Modern PHP 8+, OOP design patterns, and performance-tuned application logic." },
  { name: "Livewire", level: "Advanced", exp: "2+ yrs", size: "tall", desc: "Reactive, server-driven UI components without leaving the Laravel ecosystem." },
  { name: "Alpine.js", level: "Proficient", exp: "1.5+ yrs", size: "sm", desc: "Lightweight interactivity layered directly into Blade templates." },
  { name: "Tailwind CSS", level: "Advanced", exp: "2+ yrs", size: "wide", desc: "Utility-first design systems for premium, consistent interfaces." },
  { name: "JavaScript", level: "Proficient", exp: "2+ yrs", size: "sm", desc: "Modern ES modules, DOM orchestration, and animation-driven interactions." },
  { name: "MySQL", level: "Advanced", exp: "2+ yrs", size: "sm", desc: "Schema design, query optimization, and relational data integrity at scale." },
  { name: "AWS S3", level: "Proficient", exp: "1.5+ yrs", size: "tall", desc: "Object storage, media pipelines, and secure asset delivery in production." },
  { name: "REST APIs", level: "Advanced", exp: "2+ yrs", size: "wide", desc: "Designing and consuming versioned, authenticated API layers." },
  { name: "GitHub", level: "Advanced", exp: "2+ yrs", size: "sm", desc: "Branch strategy, code review, and CI-driven collaboration workflows." },
  { name: "Linux", level: "Proficient", exp: "2+ yrs", size: "sm", desc: "Server administration, deployment pipelines, and shell-driven tooling." },
  { name: "GSAP", level: "Proficient", exp: "1+ yr", size: "sm", desc: "Timeline-based motion design and scroll-driven storytelling." },
  { name: "Three.js", level: "Proficient", exp: "1+ yr", size: "wide", desc: "Real-time 3D scenes, shaders, and immersive web experiences." },
  { name: "Blender", level: "Familiar", exp: "1+ yr", size: "sm", desc: "Low-poly 3D asset modeling optimized for real-time web scenes." },
];

/* Placeholder project data — swap in real repos, screenshots, and links. */
export const PROJECTS = [
  {
    title: "Aurora Commerce",
    category: "E-Commerce Platform",
    description: "A multi-vendor commerce engine with real-time inventory sync, role-based dashboards, and S3-backed media pipelines built for high-traffic launches.",
    stack: ["Laravel", "Livewire", "MySQL", "AWS S3"],
    github: "#",
    demo: "#",
  },
  {
    title: "Northstar CRM",
    category: "Internal Operations Tool",
    description: "A lead-to-cash CRM led end-to-end as Project Lead — from schema design through production deployment and team onboarding.",
    stack: ["Laravel", "Alpine.js", "Tailwind", "REST APIs"],
    github: "#",
    demo: "#",
  },
  {
    title: "Helio Ops",
    category: "DevOps Dashboard",
    description: "A Linux-hosted deployment and monitoring console with queue visibility, manual QA checklists, and one-click rollback workflows.",
    stack: ["Laravel", "MySQL", "Linux", "GitHub Actions"],
    github: "#",
    demo: "#",
  },
  {
    title: "Vantage Booking",
    category: "SaaS Scheduling",
    description: "A multi-tenant booking platform with API-first architecture, animated Livewire flows, and horizontally scaling infrastructure.",
    stack: ["Livewire", "PHP", "MySQL", "REST APIs"],
    github: "#",
    demo: "#",
  },
];

export const TIMELINE = [
  {
    year: "2026",
    hash: "a3f9e2c",
    tag: "HEAD -> main, tag: v4.0",
    title: "Project Lead",
    org: "Leading cross-functional delivery",
    type: "lead",
    description: "Own product roadmaps end-to-end — coordinating engineering, QA, and deployment while mentoring the team on Laravel best practices.",
  },
  {
    year: "2025",
    hash: "7c21b4d",
    tag: "tag: v3.0",
    title: "Production Deployment & Team Management",
    org: "Scaling delivery pipelines",
    type: "work",
    description: "Introduced structured release pipelines, manual QA checklists, and zero-downtime deployment practices across client applications.",
  },
  {
    year: "2024",
    hash: "e88f01a",
    tag: "tag: v2.0",
    title: "Laravel Developer",
    org: "Full stack feature delivery",
    type: "work",
    description: "Shipped Livewire-driven applications, REST APIs, and MySQL-backed systems across multiple production environments.",
  },
  {
    year: "2023",
    hash: "4b019fa",
    tag: "tag: v1.0",
    title: "Started Full Stack Journey",
    org: "Foundations in PHP & the web",
    type: "cert",
    description: "Built a foundation in PHP, JavaScript, and MySQL — laying the groundwork for scalable Laravel application development.",
  },
];

export const SERVICES = [
  {
    title: "Laravel Development",
    desc: "Scalable backend architecture, Eloquent modeling, and Livewire-powered interfaces.",
    glyph: "◆",
  },
  {
    title: "Project Leadership",
    desc: "Roadmap ownership, team coordination, and delivery accountability from kickoff to launch.",
    glyph: "▲",
  },
  {
    title: "API & Systems Integration",
    desc: "Secure, versioned REST APIs connecting internal tools and third-party services.",
    glyph: "◈",
  },
  {
    title: "Production Deployment",
    desc: "Linux server management, CI-driven releases, and zero-downtime deployment strategy.",
    glyph: "⬢",
  },
];

/* Placeholder testimonials — replace with real client / teammate quotes. */
export const TESTIMONIALS = [
  { quote: "A rare mix of product thinking and engineering precision — deployments felt effortless.", name: "Product Director", role: "SaaS Platform" },
  { quote: "Akersh led the rebuild with total ownership, from architecture to the final release checklist.", name: "Founder", role: "Early-stage Startup" },
  { quote: "Every Livewire interaction felt considered — the kind of polish clients notice immediately.", name: "CTO", role: "Digital Agency" },
  { quote: "Manual QA discipline caught issues before they ever reached production. Rare at this speed.", name: "QA Lead", role: "Internal Team" },
];

export function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function renderTemplate() {
  return `
  <a href="#main" class="skip-link">Skip to content</a>

  <div id="loading-screen" class="loading-screen" role="status" aria-live="polite">
    <div class="loading-inner">
      <div class="loading-logo">AB</div>
      <div class="loading-bar"><span id="loading-bar-fill"></span></div>
      <p class="loading-label">INITIALIZING EXPERIENCE <span id="loading-percent">0%</span></p>
    </div>
  </div>

  <div id="cursor-dot" class="cursor-dot" aria-hidden="true"></div>
  <div id="cursor-ring" class="cursor-ring" aria-hidden="true"></div>
  <div id="cursor-spotlight" class="cursor-spotlight" aria-hidden="true"></div>

  <div class="noise-overlay" aria-hidden="true"></div>
  <div class="scanline-overlay" aria-hidden="true"></div>

  <header id="site-header" class="site-header">
    <nav class="site-nav" aria-label="Primary">
      <a href="#hero" class="brand">AKERSH<span class="brand-dot">.</span></a>
      <div class="nav-links">
        ${NAV_LINKS.map((l) => `<a href="${l.href}" class="nav-link">${l.label}</a>`).join("")}
      </div>
      <a href="#contact" class="nav-cta magnetic">Let's Talk</a>
      <button id="nav-toggle" class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div id="nav-mobile" class="nav-mobile" aria-hidden="true">
      ${NAV_LINKS.map((l) => `<a href="${l.href}" class="nav-mobile-link">${l.label}</a>`).join("")}
      <a href="#contact" class="nav-mobile-link nav-mobile-cta">Let's Talk</a>
    </div>
  </header>

  <main id="main">
    <section id="hero" class="hero-section" aria-label="Introduction">
      <div id="hero-canvas" class="hero-canvas" aria-hidden="true"></div>
      <div class="hero-vignette" aria-hidden="true"></div>

      <div class="hero-float hero-float-laravel" aria-hidden="true">
        <span class="chip-glow"></span>
        <svg viewBox="0 0 40 42" class="hero-float-icon"><path fill="currentColor" d="M39.94 9.44a.62.62 0 0 1 .06.27v8.9a.6.6 0 0 1-.31.53l-7.46 4.31v8.55a.6.6 0 0 1-.3.53L16.5 41.6a.7.7 0 0 1-.2.07h-.06a.6.6 0 0 1-.15 0 .5.5 0 0 1-.1 0l-.05 0-15.4-8.9A.6.6 0 0 1 0 32.2V5.53a.6.6 0 0 1 .06-.27.5.5 0 0 1 .1-.15l.1-.09L.36 5 7.8.09a.6.6 0 0 1 .61 0l7.45 4.3.05 0 .1.09a.5.5 0 0 1 .11.16.6.6 0 0 1 .05.26v16.15l6.49-3.75V9.7a.6.6 0 0 1 .06-.27.5.5 0 0 1 .1-.15l.1-.1L30.27 5a.6.6 0 0 1 .61 0l7.45 4.3.1.1a.5.5 0 0 1 .1.15Z"/></svg>
        <span>Laravel</span>
      </div>

      <div class="hero-float hero-float-aws" aria-hidden="true">
        <div class="floating-cube">
          <div class="cube-face cube-front">S3</div>
          <div class="cube-face cube-right"></div>
          <div class="cube-face cube-top"></div>
        </div>
        <span>AWS S3</span>
      </div>

      <div class="hero-float hero-float-code" aria-hidden="true">
        <div class="code-window">
          <div class="code-dots"><span></span><span></span><span></span></div>
          <pre class="code-lines"><span class="c-kw">Route</span>::<span class="c-fn">get</span>(<span class="c-str">'/deploy'</span>, <span class="c-kw">fn</span>() => <span class="c-fn">Artisan</span>::<span class="c-fn">call</span>(<span class="c-str">'migrate'</span>));
<span class="c-com">// production ready ✓</span></pre>
        </div>
      </div>

      <div class="hero-float hero-float-api" aria-hidden="true">
        <span class="api-node"></span>
        <span>REST API</span>
      </div>

      <div class="hero-content">
        <p class="hero-eyebrow reveal-up">Laravel Developer · Project Lead · Full Stack</p>
        <h1 class="hero-title" id="hero-title">
          <span class="hero-title-line" data-split>AKERSH</span>
          <span class="hero-title-line hero-title-accent" data-split>BHASKAR</span>
        </h1>
        <p class="hero-tagline reveal-up">
          <span id="typewriter" class="typewriter"></span><span class="typewriter-cursor">|</span>
        </p>
        <p class="hero-sub reveal-up">
          I design and ship scalable Laravel applications — leading teams from architecture through production deployment with cinematic attention to detail.
        </p>
        <div class="hero-actions reveal-up">
          <a href="#projects" class="btn btn-primary magnetic"><span>View Projects</span></a>
          <a href="/resume.pdf" download class="btn btn-ghost magnetic"><span>Download Resume</span></a>
          <a href="#contact" class="btn btn-ghost magnetic"><span>Contact Me</span></a>
        </div>
      </div>

      <div class="scroll-hint" aria-hidden="true">
        <span class="scroll-hint-line"></span>
        <span>SCROLL</span>
      </div>
    </section>

    <section id="about" class="section" aria-label="About">
      <div class="section-inner about-grid">
        <div class="glass-panel tilt-panel about-copy reveal">
          <p class="eyebrow">About</p>
          <h2 class="section-title">Designing high-impact products with a founder's urgency and an engineer's discipline.</h2>
          <p class="section-copy">
            I'm Akersh Bhaskar, a Laravel developer and project lead with 2+ years of experience building
            production-grade web applications. I bridge product strategy, backend architecture, manual QA,
            and deployment — leading teams while staying hands-on in the code.
          </p>
          <ul class="about-points">
            <li><span>01</span>Full lifecycle ownership — from schema to server</li>
            <li><span>02</span>Manual testing discipline baked into every release</li>
            <li><span>03</span>Team management with an engineering-first mindset</li>
          </ul>
        </div>
        <div class="glass-panel tilt-panel about-portrait reveal">
          <div class="portrait-ring">
            <div class="portrait-inner">AB</div>
          </div>
          <p class="portrait-name">Akersh Bhaskar</p>
          <p class="portrait-role">Laravel Developer &middot; Project Lead</p>
        </div>
        <div class="about-stats reveal">
          ${STATS.map(
            (s) => `
          <div class="glass-panel stat-card">
            <div class="stat-number"><span class="counter" data-target="${s.target}">0</span>${s.suffix}</div>
            <p class="stat-label">${s.label}</p>
          </div>`,
          ).join("")}
        </div>
      </div>
    </section>

    <section id="skills" class="section" aria-label="Skills">
      <div class="section-inner">
        <div class="section-head reveal">
          <p class="eyebrow">Core Stack</p>
          <h2 class="section-title">A stack built for production velocity.</h2>
          <p class="section-copy">Hover a card to see how each technology gets used.</p>
        </div>
        <div class="skills-bento reveal" role="list" aria-label="Technology skills">
          ${SKILLS.map(
            (s) => `
          <div class="skill-card size-${s.size}" role="listitem" data-level="${s.level}">
            <div class="skill-card-head">
              <span class="skill-level">${s.level}</span>
              <span class="skill-exp">${s.exp}</span>
            </div>
            <div class="skill-name-row">
              ${iconMarkup(s.name)}
              <h3 class="skill-name">${s.name}</h3>
            </div>
            <p class="skill-desc">${s.desc}</p>
          </div>`,
          ).join("")}
        </div>
      </div>
    </section>

    <section id="projects" class="section projects-section" aria-label="Projects">
      <div class="section-inner">
        <div class="section-head reveal">
          <p class="eyebrow">Selected Work</p>
          <h2 class="section-title">Immersive products, thoughtfully engineered.</h2>
        </div>
        <div class="terminal-window reveal">
          <div class="terminal-titlebar">
            <span class="terminal-dot terminal-dot-a"></span>
            <span class="terminal-dot terminal-dot-b"></span>
            <span class="terminal-dot terminal-dot-c"></span>
            <span class="terminal-title">akersh@portfolio: ~/projects</span>
          </div>
          <div class="terminal-body">
            <p class="terminal-line">
              <span class="terminal-prompt">akersh@portfolio</span><span class="terminal-path">:~/projects$</span> ls -la
            </p>
            <div class="terminal-listing" role="list" aria-label="Projects">
              ${PROJECTS.map(
                (p, i) => `
              <button type="button" class="terminal-entry${i === 0 ? " is-active" : ""}" data-index="${i}" role="listitem">
                <span class="terminal-perms">drwxr-xr-x</span>
                <span class="terminal-dirname">${slugify(p.title)}/</span>
                <span class="terminal-category"># ${p.category}</span>
              </button>`,
              ).join("")}
            </div>
            <p class="terminal-line">
              <span class="terminal-prompt">akersh@portfolio</span><span class="terminal-path">:~/projects$</span> cat <span id="terminal-active-path">${slugify(PROJECTS[0].title)}/readme.md</span>
            </p>
            <div id="terminal-output" class="terminal-output" aria-live="polite"></div>
          </div>
        </div>
      </div>
    </section>

    <section id="timeline" class="section" aria-label="Career timeline">
      <div class="section-inner">
        <div class="section-head reveal">
          <p class="eyebrow">Journey</p>
          <h2 class="section-title">Leadership, execution, and production discipline.</h2>
        </div>
        <div class="git-log">
          <p class="git-log-cmd">$ git log --graph --decorate</p>
          <ul class="git-log-list">
            ${TIMELINE.map(
              (t) => `
            <li class="git-commit reveal" data-type="${t.type}">
              <span class="git-node" aria-hidden="true"></span>
              <p class="git-commit-line">
                <span class="git-hash">commit ${t.hash}</span>
                <span class="git-decor">(${t.tag})</span>
              </p>
              <p class="git-meta">Author: Akersh Bhaskar &lt;akarshbhaskar2000@gmail.com&gt;</p>
              <p class="git-meta">Date:   ${t.year}</p>
              <h3 class="git-message">${t.title}</h3>
              <p class="git-org">${t.org}</p>
              <p class="git-body">${t.description}</p>
            </li>`,
            ).join("")}
          </ul>
        </div>
      </div>
    </section>

    <!-- Services and Testimonials sections are hidden (kept in code for easy re-enable). -->

    <section id="contact" class="section contact-section" aria-label="Contact">
      <canvas id="contact-particles" class="contact-particles" aria-hidden="true"></canvas>
      <div class="section-inner">
        <div class="contact-grid">
          <div class="reveal contact-intro">
            <p class="eyebrow">Contact</p>
            <h2 class="section-title">Let's build something unforgettable.</h2>
            <p class="section-copy">
              Whether you need a high-performance Laravel application, a project lead, or a polished
              digital experience — I'm ready to bring the vision to production.
            </p>
            <a href="mailto:akarshbhaskar2000@gmail.com" class="contact-email magnetic">akarshbhaskar2000@gmail.com</a>
          </div>
          <form id="contact-form" class="glass-panel contact-form reveal" novalidate>
            <div class="form-field">
              <input id="field-name" name="name" type="text" required placeholder=" " autocomplete="name" />
              <label for="field-name">Name</label>
              <span class="field-line"></span>
            </div>
            <div class="form-field">
              <input id="field-email" name="email" type="email" required placeholder=" " autocomplete="email" />
              <label for="field-email">Email</label>
              <span class="field-line"></span>
            </div>
            <div class="form-field">
              <textarea id="field-message" name="message" required placeholder=" "></textarea>
              <label for="field-message">Project brief</label>
              <span class="field-line"></span>
            </div>
            <button type="submit" id="contact-submit" class="btn btn-primary btn-morph magnetic">
              <span class="btn-morph-label">Send Enquiry</span>
              <span class="btn-morph-spinner" aria-hidden="true"></span>
              <span class="btn-morph-success" aria-hidden="true">Sent &check;</span>
            </button>
            <p id="contact-status" class="contact-status" role="status" aria-live="polite"></p>
          </form>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <svg class="footer-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <path id="footer-wave-path" d="M0,64 C360,120 1080,0 1440,64 L1440,120 L0,120 Z" />
    </svg>
    <div class="footer-inner">
      <div class="footer-brand">AKERSH<span class="brand-dot">.</span></div>
      <p class="footer-tag">Laravel Developer &middot; Project Lead &middot; Full Stack Web Developer</p>
      <div class="footer-social">
        <a href="https://github.com" target="_blank" rel="noreferrer" class="social-icon magnetic" aria-label="GitHub">GH</a>
        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" class="social-icon magnetic" aria-label="LinkedIn">IN</a>
        <a href="mailto:akarshbhaskar2000@gmail.com" class="social-icon magnetic" aria-label="Email">@</a>
      </div>
      <p class="footer-copy">&copy; <span id="footer-year"></span> Akersh Bhaskar. Built with Laravel-grade discipline.</p>
    </div>
  </footer>

  <div id="easter-egg" class="easter-egg" aria-hidden="true">
    <p>🎮 Konami unlocked — you found the hidden build.</p>
  </div>
  `;
}
