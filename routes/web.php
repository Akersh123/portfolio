<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
});

Route::get('/resume', function () {
    return view('coming-soon');
})->name('coming-soon');
Route::get('/contact', function () {
    return view('coming-soon');
})->name('coming-soon.contact');
