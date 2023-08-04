@section('title', 'Ganti Password')
<x-app-layout>
    <div class="content-main">
        <div class="content-header">
            <div class="content-title">
                <div>
                    <p class="font-bold text-[22px]">
                        Ganti Password
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
                            <li>Pengaturan</li>
                            <li>Ganti Password</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

        <div class="content-body">
            <div class="!w-[30%]">
                <div class="form-group">
                    <label>Password Lama</label>
                    <label class="form-group-control relative">
                        <input type="password" class="form-control passwordLama" placeholder="...">
                        <a class="flex btnLookPasswordLama absolute right-[0.5rem]">
                            <i class="fas fa-eye-slash"></i>
                        </a>
                    </label>
                    <div class="info-alert-text error passwordLamaError hidden">
                        <i class="fas fa-exclamation-circle"></i>
                        <div class="passwordLamaErrorText"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Password Baru</label>
                    <label class="form-group-control relative">
                        <input type="password" class="form-control passwordBaru" placeholder="...">
                        <a class="flex btnLookPasswordBaru absolute right-[0.5rem]">
                            <i class="fas fa-eye-slash"></i>
                        </a>
                    </label>
                    <div class="info-alert-text error passwordBaruError hidden">
                        <i class="fas fa-exclamation-circle"></i>
                        <div class="passwordBaruErrorText"></div>
                    </div>
                    <div class="info-alert-text">
                        <i class="fas fa-info-circle"></i>
                        <div>Masukan Password baru, minimal 8 karakter</div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Konfirmasi Password Baru</label>
                    <label class="form-group-control relative">
                        <input type="password" class="form-control rePasswordBaru" placeholder="...">
                        <a class="flex btnLookRePasswordBaru absolute right-[0.5rem]">
                            <i class="fas fa-eye-slash"></i>
                        </a>
                    </label>
                    <div class="info-alert-text error rePasswordBaruError hidden">
                        <i class="fas fa-exclamation-circle"></i>
                        <div class="rePasswordBaruErrorText"></div>
                    </div>
                    <div class="info-alert-text">
                        <i class="fas fa-info-circle"></i>
                        <div>Ulangi Password baru diatas</div>
                    </div>
                </div>
                <div class="form-group mt-4">
                    <button class="ds-btn ds-btn-primary normal-case btnSimpan !w-full">
                        Simpan Perubahan
                    </button>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>

@env('local')
    @vite(['resources/js/main/pengaturan/ganti-password/index.js'])
@endenv
@env(['staging', 'production'])
    <script src="{{asset('js/main/pengaturan/ganti-password/index.js?time=' . time())}}"></script>
@endenv
