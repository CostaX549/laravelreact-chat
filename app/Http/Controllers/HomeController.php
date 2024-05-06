<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function home() {
        return inertia('Home');
    }

    public function landingPage() {
        return inertia('LandingPage/LandingPage');
    }
}
