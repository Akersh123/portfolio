{{-- resources/views/layouts/app.blade.php --}}
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>@yield('title', config('app.name', 'Portfolio'))</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/home.css') }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @livewireStyles
</head>

<body>
    <div id="page-loader">
        <div class="loader-box">
            <div id="loader-percent">0%</div>
        </div>
    </div>

    <header class="absolute top-0 left-0 right-0 z-40">
        <div class="w-full mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" class="text-xl text-white font-bold">Akersh</a>
            <nav class="space-x-4 text-sm text-white">
                <a href="#about-section" class="hover:underline">About</a>
                <a href="#projects" class="hover:underline">Projects</a>
                <a href="#resume" class="hover:underline">Resume</a>
                <a href="#contact" class="hover:underline">Contact</a>
            </nav>
        </div>


    </header>

    <main class="w-full">
        @yield('content')
    </main>

    <footer class="w-full text-center mx-auto p-6 text-sm text-gray-500">
        © {{ date('Y') }} All Rights Reserved.
    </footer>

    @livewireScripts
</body>

</html>
