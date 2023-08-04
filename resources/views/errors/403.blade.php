<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="light">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    <title>403 | Forbidden</title>
    <link rel="shortcut icon" href="{{asset('/images/favicon.png')}}"/>
    @env('local')
        @vite(['resources/css/app.scss'])
    @endenv
    @env(['staging', 'production'])
        <link rel="stylesheet" href="{{asset('css/app.css?time=' . time())}}"/>
    @endenv
</head>
<body>
    <div class="bg-gray-100 h-screen flex items-center justify-center">
        <div>
            <img src="{{ asset('images/vector/vector-403.png') }}" width="400" alt="">
        </div>
        <div>
            <div class="text-gray-500 text-[29px]">Oppss!</div>
            <div class="text-gray-500 text-xl">{{ $exception->getMessage() }}</div>
            <a class="ds-btn ds-btn-outline ds-btn-primary normal-case mt-3" href="{{ url('/') }}">
                Kembali
            </a>
        </div>
    </div>
</body>
</html>
