@section('title', 'Data Karyawan')
<x-app-layout>
    <div class="content-main">
        <div class="content-header">
            <div class="content-title">
                <div>
                    <p class="font-bold text-[22px]">
                        Data Karyawan
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
                            <li>Master</li>
                            <li>Data Karyawan</li>
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
                        <i class="fas fa-plus-circle mr-2"></i> Tambah Karyawan
                    </button>
                </div>
            </div>
        </div>

        <div class="content-body">
            <div class="card z-[200]">
                <div class="card-header !pb-0 mb-4">
                    <div>
                        <div class="font-bold text-[18px]">Data</div>
                    </div>
                </div>

                <div class="card-body w-full !p-0">
                    <div class="overflow-auto min-h-[calc(100vh-22rem)]">
                        <table class="table table-fixed">
                            <thead>
                                <tr class="sticky-header">
                                    <th class="text-center w-[70px]">No.</th>
                                    <th class="text-center w-[100px]">NPP</th>
                                    <th class="text-left w-[250px]">Nama Karyawan</th>
                                    <th class="text-left w-[200px]">Email</th>
                                    <th class="text-left w-[200px]">Timezone</th>
                                    <th data-sticky data-sticky-rw="250px" data-sticky-bp-ex="sm" class="text-right w-[150px]">Role</th>
                                    <th data-sticky data-sticky-rw="100px" data-sticky-bp-ex="sm" class="text-right w-[150px]">Status Karyawan</th>
                                    <th data-sticky data-sticky-rw="0px" class="text-center w-[100px]">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                @php($i = isset($items) ? $items->firstItem() : 0)
                                @if(isset($items) && count($items) !== 0)
                                    @foreach($items as $item)
                                        <tr class="data-tables" data-items="{{json_encode($item)}}">
                                            <td class="text-center">{{$i++}}</td>
                                            <td class="text-center">{{$item->npp ?? '--'}}</td>
                                            <td class="text-left">{{Helper::singkatNama($item->name)}}</td>
                                            <td class="text-left">{{$item->email ?? '--'}}</td>
                                            <td class="text-left">{{$item->timezone ?? '--'}}</td>
                                            <td data-sticky data-sticky-rw="250px" data-sticky-bp-ex="sm" class="text-right">
                                                {{$item->role->role ?? '--'}}
                                            </td>
                                            <td data-sticky data-sticky-rw="100px" data-sticky-bp-ex="sm" class="text-right">
                                                @if($item->status_user == 1)
                                                    <div class="ds-badge ds-badge-success text-[12px]">Active</div>
                                                @else
                                                    <div class="ds-badge ds-badge-error text-[12px]">Non Active</div>
                                                @endif
                                            </td>
                                            <td data-sticky data-sticky-rw="0px" class="text-center">
                                                <a href="javascript:void(0)" class="btnEdit">
                                                    [ Edit ]
                                                </a>
                                            </td>
                                        </tr>
                                    @endforeach
                                @endif
                            </tbody>
                        </table>
                    </div>
                    @if(isset($items) && count($items) === 0)
                        <div class="not-found">
                            <div>Data Karyawan tidak ditemukan</div>
                        </div>
                    @endif
                </div>

                @if(isset($items) && count($items) !== 0)
                    <div class="card-footer">
                        @if($items->hasPages())
                            {{$items->withQueryString()->links('pagination::tailwind')}}
                        @else
                            <div class="px-[10px] py-[5px] mr-2 text-sm text-gray-700">
                                Menampilkan {{$items->firstItem()}} s/d {{$items->lastItem()}} dari {{$items->total()}} Total Data
                            </div>
                        @endif
                    </div>
                @endif
            </div>
        </div>

        @include('main.master.data-karyawan.popup.pencarian')
        @include('main.master.data-karyawan.popup.form')

    </div>
</x-app-layout>

@env('local')
    @vite(['resources/js/main/master/data-karyawan/index.js'])
@endenv
@env(['staging', 'production'])
    <script src="{{asset('js/main/master/data-karyawan/index.js?time=') . time()}}"></script>
@endenv
