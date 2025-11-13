<div id="projects-section" class="py-10" wire:ignore.self>
    <h2 id="projects" class="text-3xl font-bold mb-6 text-center">My Projects</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4" id="project-cards">
        @foreach($projects as $project)
            <article
                class="project-card p-6 bg-white rounded-2xl shadow-sm transform transition hover:shadow-md hover:-translate-y-1"
                data-id="{{ $project['id'] }}">
                <h3 class="text-lg font-semibold mb-2">{{ $project['title'] }}</h3>
                <p class="text-sm text-gray-600 mb-4">{{ $project['desc'] }}</p>

                <div class="flex flex-wrap gap-2">
                    @foreach($project['tags'] as $tag)
                        <span class="text-xs px-3 py-1 bg-gray-100 rounded-full">{{ $tag }}</span>
                    @endforeach
                </div>
            </article>
        @endforeach
    </div>
</div>
