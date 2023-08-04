<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="light">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="npp" content="{{ Auth::user()->npp }}">
    <title>@yield('title') - Agenda</title>
    <link rel="shortcut icon" href="{{asset('/images/favicon.png')}}"/>
    <!-- Scripts -->
    @env('local')
        @vite(['resources/css/app.scss', 'resources/css/toast.scss', 'resources/js/app.js'])
    @endenv
    @env(['staging', 'production'])
        <link rel="stylesheet" href="{{asset('css/app.css?time=' . time())}}"/>
        <link rel="stylesheet" href="{{asset('css/toast.css?time=' . time())}}"/>
        <script src="{{asset('js/app.js?time=') . time()}}"></script>
    @endenv
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="{{asset('js/plugins/select2/dist/js/select2.js')}}"></script>
    <script src="{{asset('js/plugins/datetimepicker/dist/js/jquery.datetimepicker.full.js')}}"></script>
    <script src="{{asset('js/plugins/jquery.inputmask.js')}}"></script>
    <script>
        let BASE_URL = '{{ url('') }}/'
    </script>
</head>
<body>
    @include('layouts.header')
    @stack('script')
</body>
</html>
