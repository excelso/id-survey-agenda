<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="light">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    <title>401</title>
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
        <div class="text-gray-500 text-2xl block"><span>4  0  1</span></div>
        <div class="w-[3px] h-[70px] bg-gray-400 mx-4"></div>
        <div class="text-gray-500 text-xl">{{ $exception->getMessage() }}</div>
    </div>
</body>
</html>
