{{-- resources/views/home.blade.php --}}
@extends('layouts.app')

@section('title', 'Home — Akersh')

@section('content')
    <section id="hero" class="w-full">
        <div id="mouse-tracker" class="pointer-events-none fixed top-0 left-0 z-30"></div>
        <div class="relative h-screen w-full">
            {{-- <div class="hero-bg absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style="background-image: url('{{ asset('images/home.jpg') }}');">
            </div> --}}
            <video id="hero-video" data-src="{{ asset('images/home.mp4') }}" autoplay muted loop playsinline preload="auto"
                class="absolute inset-0 w-full h-full object-cover z-0">
                <source src="{{ asset('images/home.mp4') }}" type="video/mp4" />
            </video>
            <div class="absolute inset-0 bg-black/30 z-10">
            </div>
            <div class="relative z-20 flex flex-col h-full justify-center">
                <div class="flex-col flex items-center justify-center px-4">
                    <h1 id="hero-title"
                        class="max-w-[900px] text-center text-white text-[2.75rem] md:text-[3.5rem] lg:text-[5rem] font-semibold leading-snug">
                        Hi — I'm Akersh
                    </h1>
                </div>
                <div id="hero-subwrapper" class="mt-2 inline-flex items-center justify-center gap-3">
                    <span id="hero-substatic" class="text-sm md:text-base text-gray-200">I am</span>

                    <!-- Subtitle + cursor now in ONE element -->
                    <span id="hero-subtitle" class="text-sm md:text-lg text-white font-medium">
                        <span id="hero-text"></span><span id="hero-cursor">|</span>
                    </span>
                </div>

            </div>
        </div>
    </section>
    {{-- Insert the Livewire component --}}
    <livewire:about-portfolio />
    <livewire:project-portfolio />
@endsection
