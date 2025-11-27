<div id="project-managed-section" class="py-10" wire:ignore.self>
    <h2 id="projectsManaged" class="text-3xl font-bold mb-6 text-center">Skills</h2>

    <div class="skills-card max-w-6xl mx-auto px-4">
        <!-- grid: responsive columns -->
        <div class="skills-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
            id="project-managed-cards">
            @foreach ($images as $tag)
                @php
                    // round-robin depths so icons have variety
                    $depthBase = 0.06;
                    $depth = $depthBase + ($loop->index % 5) * 0.02; // 0.06,0.08,0.10...
                @endphp

                <div class="skill-item" data-depth="{{ number_format($depth, 2) }}" role="img"
                    aria-label="skill-{{ $loop->index }}">
                    <img src="{{ asset($tag) }}" alt="skill-{{ $loop->index }}" loading="lazy"
                        class="max-w-full h-auto" />
                </div>
            @endforeach
        </div>
    </div>
</div>
