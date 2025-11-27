<?php

namespace App\Livewire;

use Livewire\Component;

class WorkExperience extends Component
{
    public $image;

    public function mount()
    {
        $this->image = 'images/bytekat-1.png';
    }

    public function render()
    {
        return view('livewire.work-experience');
    }
}
