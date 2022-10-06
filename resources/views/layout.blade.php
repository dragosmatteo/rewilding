<!DOCTYPE html>
<html lang="en">
<head>
    <title>{{ env('APP_NAME') }}</title>
    <link rel="stylesheet" href="{{ URL::asset('css/app.css') }}">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <style>
        footer {
            width: 100%;
            /* position: fixed; */
            bottom: -1px;
            min-height: 14vh;
        }
        footer p {
            max-width: 70%;
            margin: auto;
            font-size: small;
        }
    </style>
</head>
<body>
    <div id="app" style="min-height:86vh;">
        <header-component :is-auth="{{ json_encode(auth()->check()) }}">
            @csrf
        </header-component>
        <router-view></router-view>

        {{-- @yield('content') --}}

        @if (session()->has('success'))
            <custom-message message="{{ session('success') }}"></custom-message> 
        @endif
    </div>
    <footer class="header text-center empty-page">
        <p class="text-white text-center p-3">
            Copyright (C) 2022, frosdot.com (a division of Orcro Limited), All rights reserved. 
            <br>Copying, modification and redistribution of this notice are governed by Creative Commons Attribution License 4.0: https://creativecommons.org/licenses/by/4.0/ . <br>
            Sponsored by the Interledger Foundation: interledger.org.
        </p>
    </footer>
</body>

<script src="{{ mix('js/app.js') }}"></script>
</html>
