<?php

namespace App\Livewire;

use Livewire\Component;

class ProjectsManaged extends Component
{
    public $tags = [];
    public $images = [];
    public function mount()
    {
        $this->tags = ['Laravel', 'html', 'css', 'jQuery', 'javascript'];
        // $this->images = ['images/laravel-1.png', 'images/html-1.png','images/css-1.png','images/mysql-1.png','images/js-1.png','images/php.png'];
        $this->images = ['images/laravel-3d.png', 'images/php-3d.png', 'images/html-3d.png', 'images/css-3d.png', 'images/js-3d.png', 'images/bs-3d.png',];
    }
    public function render()
    {
        return view('livewire.projects-managed');
    }
}
