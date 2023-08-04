@section('title', 'Beranda')
<x-app-layout>
    <div class="content-main">
        <div class="content-header">
            <div class="content-title">
                <div>
                    <p class="font-bold text-[24px]">
                        Beranda
                    </p>
                </div>
            </div>
            <div class="flex flex-row items-center">
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
    </div>
</x-app-layout>

@env('local')
    @vite(['resources/js/main/dashboard/index.js'])
@endenv
@env(['staging', 'production'])
    <script src="{{asset('js/main/dashboard/index.js?time=') . time()}}"></script>
@endenv
