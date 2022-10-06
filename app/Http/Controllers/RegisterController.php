<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class RegisterController extends Controller
{
    public function create()
    {
        return view('register.create');
    }

    public function store()
    {
        // create the user

        $attributes = request()->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'min:7']
        ]);

        $user = User::create($attributes);

        auth()->login($user); //log the user in

        session()->flash('success', 'Your account has been created.'); // to do

        return redirect('/');
    }
}
