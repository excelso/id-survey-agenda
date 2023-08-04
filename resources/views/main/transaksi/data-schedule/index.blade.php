@section('title', 'Data Agenda')
<x-app-layout>
    <div class="content-main">
        <div class="content-header">
            <div class="content-title">
                <div>
                    <p class="font-bold text-[22px]">
                        Data Agenda
                    </p>
                    <nav aria-label="Breadcrumb">
                        <ul class="breadcrumb truncate">
                            <li>
                                <a href="{{ url('/') }}">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                    </svg>
                                </a>
                            </li>
                            <li>Transaksi</li>
                            <li>Data Agenda</li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div class="flex flex-row items-center">
                <div class="mr-3">
                    <a class="cursor-pointer btnPencarian ml-2">
                        <i class="fas fa-search mr-2"></i> Pencarian
                    </a>
                </div>
                <div class="mr-2">
                    <button class="btn btn-primary btnTambah ml-2">
                        <i class="fas fa-plus-circle mr-2"></i> Tambah Agenda
                    </button>
                </div>
            </div>
        </div>

        <div class="content-body">
            <div class="card">
                <div class="card-header !pb-0 my-1 mx-1">
                    <div class="title">
                        <ul class="flex flex-wrap font-bold text-center rounded-lg p-1 text-[12px] bg-gray-100 border-[1px] border-gray-200" role="exTabs" data-tabs-toggle="#calendarTabs">
                            <li class="mr-2 grow-[1]">
                                <a class="inline-block px-4 py-2 rounded-lg cursor-pointer w-full" data-tabs-target="#dTab">
                                    Harian
                                </a>
                            </li>
                            <li class="mx-1 grow-[1]">
                                <a class="inline-block px-4 py-2 rounded-lg cursor-pointer w-full text-white bg-blue-600" data-tabs-target="#wTab">
                                    Mingguan
                                </a>
                            </li>
                            <li class="ml-2 grow-[1]">
                                <a class="inline-block px-4 py-2 rounded-lg cursor-pointer w-full" data-tabs-target="#mTab">
                                    Bulanan
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="flex items-center">
                        <div class="btn btn-primary !h-[35px] !min-h-[35px] btnToday cursor-pointer px-3 mr-3">
                            Hari Ini
                        </div>
                        <div class="titleCalendar">
                            {{ \Carbon\Carbon::now()->translatedFormat('F Y') }}
                        </div>
                        <div class="ml-3 flex">
                            <div class="btnPrevMonth cursor-pointer px-2">
                                <i class="fa fa-chevron-left text-[13px]"></i>
                            </div>
                            <div class="btnNextMonth cursor-pointer px-2">
                                <i class="fa fa-chevron-right text-[13px]"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body !mb-0">
                    <div class="overflow-auto min-h-[calc(100vh-22rem)]">
                        <div id="calendar"></div>
                    </div>
                </div>
            </div>
        </div>

        @include('main.transaksi.data-schedule.popup.form')
    </div>
</x-app-layout>

@env('local')
    @vite(['resources/js/main/transaksi/data-schedule/index.js'])
@endenv
@env(['staging', 'production'])
    <script src="{{asset('js/main/transaksi/data-schedule/index.js?time=') . time()}}"></script>
@endenv
