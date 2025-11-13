<?php

namespace App\Livewire;

use Livewire\Component;

class AboutPortfolio extends Component
{
    public $title;
    public $desc;
    public $image;

    public function mount()
    {
        $this->title = 'About Me';
        $this->desc = 'I’m a Laravel Developer with hands-on experience in building and maintaining scalable web applications since November 2023 at Bytekat Technologies Pvt. Ltd. Over the past year, I’ve contributed to full-cycle development — from crafting clean backend logic and optimizing databases to integrating APIs and enhancing application performance. I’m passionate about solving complex problems, writing clean and maintainable code, and collaborating with teams to deliver impactful digital solutions. I’m now looking to take the next step in my career with a company that values innovation, growth, and technical excellence. When I’m not coding, you’ll likely find me experimenting with new technologies, traveling, or cooking something creative.';
        $this->image = 'images/home.jpg';
    }
    public function render()
    {
        return view('livewire.about-portfolio');
    }
}
