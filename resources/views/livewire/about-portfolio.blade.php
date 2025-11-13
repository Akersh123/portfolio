<section id="about-section" class="py-12" role="region" aria-labelledby="abouts">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 id="abouts" class="text-3xl font-bold mb-8 text-center">{{ $title }}</h2>

    <!-- Responsive layout:
         - mobile: stacked (image above, text below)
         - md+: two-column with text left, image right
    -->
    <div class="flex flex-col md:flex-row md:items-center md:gap-12">
      <!-- Image column (mobile first: show on top) -->
      <div class="w-full md:w-1/2 mb-6 md:mb-0 order-1 md:order-2">
        <figure class="w-full rounded-xl overflow-hidden shadow-lg">
          <img
            src="{{ asset($image) }}"
            alt="About image"
            loading="lazy"
            class="w-full h-64 sm:h-80 md:h-96 object-cover block"
          />
        </figure>
      </div>

      <!-- Text column -->
      <div class="w-full md:w-1/2 order-2 md:order-1">
        <div class="prose prose-lg max-w-none">
          <p class="text-justify text-base leading-relaxed text-gray-200">
            {{ $desc }}
          </p>

          <!-- Optional: key facts or bullets -->
          <ul class="mt-6 space-y-3 list-none">
            <li class="flex items-start gap-3">
              <span class="inline-block mt-1 w-2 h-2 rounded-full bg-white/80"></span>
              <span class="text-sm text-gray-300">Backend development with Laravel, Eloquent and REST APIs</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="inline-block mt-1 w-2 h-2 rounded-full bg-white/80"></span>
              <span class="text-sm text-gray-300">Testing with PHPUnit / Pest and CI pipelines</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="inline-block mt-1 w-2 h-2 rounded-full bg-white/80"></span>
              <span class="text-sm text-gray-300">Deployment using Docker / Laravel Sail</span>
            </li>
          </ul>

          <!-- CTA (optional) -->
          <div class="mt-6">
            <a href="#projects" class="inline-block px-5 py-2 rounded-full bg-white text-black font-medium shadow hover:shadow-md transition">
              View Projects
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

