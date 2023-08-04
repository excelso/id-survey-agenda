<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="light">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title') - {{ config('app.name', 'Laravel') }}</title>
    <link rel="shortcut icon" href="{{asset('/images/favicon.png')}}"/>
    <script>
        let BASE_URL = '{{ url('') }}/'
    </script>
    <style>
        @page {
            header: pageHeader;
            footer: pageFooter;
            /*margin-bottom: 10cm;*/
            /*margin-header: 10mm;*/
            margin-top: 20mm;
        }

        #header {
            border-bottom: 3px solid #000000;
            /*padding-top: 4px;*/
            width: 100%;
            margin-bottom: 10mm;
        }

        table#tbl-header td {
            border: none !important;
        }

        #logo-sucofindo {
            position: absolute;
            right: 0;
            top: 0;
            width: 70px;
        }
    </style>
</head>
<body>
        <htmlpageheader name="pageHeader" style="margin-bottom: 10px">
            <div id="header">
                <table id="tbl-header" border="0" cellspacing="0" cellpadding="0" style="width: 100%">
                    <tr>
                        <td style="vertical-align: bottom"><h4 style="text-align: center;">DAFTAR RIWAYAT HIDUP</h4></td>
                        <td style="text-align: right"><img id="logo-sucofindo" src="images/logo-sucofindo.png" alt="Logo Sucofindo"></td>
                    </tr>
                </table>
            </div>
        </htmlpageheader>

        <htmlpagefooter name="pageFooter">
            <p style="text-align: right">Hal. {PAGENO} dari {nb}</p>
        </htmlpagefooter>

    <div class="container">
        @yield('content')
    </div>
</body>
</html>
