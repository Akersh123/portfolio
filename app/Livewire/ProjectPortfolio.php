<?php

namespace App\Livewire;

use Livewire\Component;

class ProjectPortfolio extends Component
{
    public $projects = [];

    public function mount()
    {
        $this->projects = [
            ['id' => 1, 'title' => 'Glamup Boutique', 'desc'=> 'Full stack e-commerce using Laravel & Livewire', 'tags' => ['Laravel','Livewire','Stripe']],
            ['id' => 2, 'title' => 'Portfolio Website', 'desc' => 'Animated portfolio using GSAP and Tailwind', 'tags' => ['GSAP','Tailwind']],
            ['id' => 3, 'title' => 'Lead Management System', 'desc' => 'Lead Management System', 'tags' => ['Laravel','Bootstrap']],
         ];
    }

    public function render()
    {
        return view('livewire.project-portfolio');
    }
}
