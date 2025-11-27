<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>Coming Soon</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/home.css') }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <!-- Tailwind CDN (for quick styling) -->
    <script src="https://cdn.tailwindcss.com"></script>

    <style>
        body {
            background: radial-gradient(circle at top, #1f2937 0, #020617 45%, #000 100%);
        }
    </style>
</head>

<body class="min-h-screen flex items-center justify-center text-slate-50 relative overflow-hidden">
    <header class="absolute top-0 left-0 right-0 z-40">
        <div class="w-full mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" class="text-xl text-white font-bold">AB</a>
            <nav class="space-x-4 text-sm text-white">
                <a href="#about-section" class="hover:underline">About</a>
                <a href="#projects" class="hover:underline">Projects</a>
                <a href="{{ route('coming-soon') }}" class="hover:underline">Resume</a>
                <a href="{{ route('coming-soon.contact') }}" class="hover:underline">Contact</a>
            </nav>
        </div>


    </header>
    <!-- Blobs -->
    <div
        class="cs-blob cs-blob-1 pointer-events-none absolute -left-32 -top-32 w-72 h-72 rounded-full bg-cyan-500/40 blur-3xl">
    </div>
    <div
        class="cs-blob cs-blob-2 pointer-events-none absolute -right-24 bottom-0 w-80 h-80 rounded-full bg-pink-500/40 blur-3xl">
    </div>

    <!-- Main Card -->
    <main class="relative z-10 w-full max-w-xl mx-4">
        <div class="bg-slate-900/70 border border-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl">

            <!-- Logo / Badge -->
            <div
                class="cs-logo inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-100 text-slate-900 text-xl font-bold mb-6 shadow-lg shadow-cyan-500/30">
                AB
            </div>

            <!-- Heading -->
            <h1 class="cs-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                Something <span class="text-cyan-400">awesome</span> is coming
            </h1>

            <!-- Subheading -->
            <p class="cs-sub text-sm sm:text-base text-slate-300 mb-6">
                I’m crafting a new experience right now. Stay tuned for the launch –
                it’ll be worth the wait.
            </p>

            {{-- <!-- Countdown (optional) -->
            <div class="cs-countdown flex items-center justify-center gap-6 mb-8 text-center">
                <div>
                    <div id="cs-days" class="text-3xl sm:text-4xl font-semibold">00</div>
                    <div class="text-xs sm:text-sm uppercase tracking-[0.2em] text-slate-400">Days</div>
                </div>
                <div>
                    <div id="cs-hours" class="text-3xl sm:text-4xl font-semibold">00</div>
                    <div class="text-xs sm:text-sm uppercase tracking-[0.2em] text-slate-400">Hours</div>
                </div>
                <div>
                    <div id="cs-minutes" class="text-3xl sm:text-4xl font-semibold">00</div>
                    <div class="text-xs sm:text-sm uppercase tracking-[0.2em] text-slate-400">Minutes</div>
                </div>
            </div> --}}

            <p class="cs-footer mt-6 text-xs text-slate-500 text-center">
                © <span id="cs-year"></span> Akersh Bhaskar. All rights reserved.
            </p>
        </div>
    </main>

    <!-- GSAP CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>

    <script>
        // ---------- Simple countdown (set your launch date here) ----------
        const launchDate = new Date();
        launchDate.setDate(launchDate.getDate() + 10); // +10 days as example

        function updateCountdown() {
            const now = new Date().getTime();
            const diff = launchDate.getTime() - now;

            if (diff <= 0) return;

            const dayMs = 1000 * 60 * 60 * 24;
            const hourMs = 1000 * 60 * 60;
            const minuteMs = 1000 * 60;

            const days = Math.floor(diff / dayMs);
            const hours = Math.floor((diff % dayMs) / hourMs);
            const minutes = Math.floor((diff % hourMs) / minuteMs);

            document.getElementById("cs-days").textContent = String(days).padStart(2, "0");
            document.getElementById("cs-hours").textContent = String(hours).padStart(2, "0");
            document.getElementById("cs-minutes").textContent = String(minutes).padStart(2, "0");
        }

        setInterval(updateCountdown, 1000);
        updateCountdown();

        // Year
        document.getElementById("cs-year").textContent = new Date().getFullYear();

        // ---------- GSAP Animations ----------
        gsap.set(".cs-blob", {
            opacity: 0.6
        });

        // Floating blobs
        gsap.to(".cs-blob-1", {
            x: 60,
            y: 40,
            scale: 1.1,
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(".cs-blob-2", {
            x: -60,
            y: -40,
            scale: 1.15,
            duration: 12,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Intro timeline
        const tl = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });

        tl.from(".cs-logo", {
                y: 30,
                opacity: 0,
                duration: 0.6
            })
            .from(".cs-heading", {
                y: 40,
                opacity: 0,
                duration: 0.7
            }, "-=0.2")
            .from(".cs-sub", {
                y: 20,
                opacity: 0,
                duration: 0.5
            }, "-=0.4")
            .from(".cs-countdown > div", {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.4
            }, "-=0.3")
            .from(".cs-form", {
                y: 20,
                opacity: 0,
                duration: 0.5
            }, "-=0.2")
            .from(".cs-footer", {
                opacity: 0,
                duration: 0.4
            }, "-=0.3");
    </script>
</body>

</html>
