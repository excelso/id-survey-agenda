<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="light">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Login | Agenda</title>
        <link rel="shortcut icon" href="{{asset('/images/favicon.png')}}"/>
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @env('local')
            @vite(['resources/css/app.scss', 'resources/js/app.js'])
        @endenv
        @env(['staging', 'production'])
            <link rel="stylesheet" href="/css/app.css"/>
            <script src="/js/app.js"></script>
        @endenv
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="{{asset('js/plugins/select2/dist/js/select2.js')}}"></script>
        <script src="{{asset('js/plugins/jquery.inputmask.js')}}"></script>
    </head>
    <body class="font-sans text-gray-900 antialiased">
        {{ $slot }}
    </body>
</html>
