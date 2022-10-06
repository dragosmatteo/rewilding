@extends('layout')

@section('content')
    <main class="max-w-lg mx-auto text-center mt-10">
        <h1 class="text-xl">Register</h1>
        <form method="POST" action="/register" class="block space-y-4">
            @csrf
            <div class="w-50 mx-auto">
                <input class="border border-gray-400 p-2 w-full"
                       type="email"
                       name="email"
                       id="email"
                       placeholder="Email"
                       required
                >
            </div>
            <div class="w-50 mx-auto">
                <input class="border border-gray-400 p-2 w-full"
                       type="password"
                       name="password"
                       id="password"
                       placeholder="password"
                       required
                >
            </div>
            <button type="submit" class="bg-blue-400 text-white rounded py-2 px-4 hover:bg-blue-500 w-50">Submit</button>
        </form>
    </main>
@endsection