<div class="modal hidden modalForm">
    <div class="modal-main">
        <div class="modal-head">
            <div class="flex justify-between items-center">
                <div class="modal-title">
                    <i class="fas fa-plus-circle"></i> Tambah Karyawan
                </div>
                <div>
                    <div class="cursor-pointer closeModalForm">
                        <i class="fas fa-close"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-body overflow-y-auto !max-h-[400px]">
            <div class="form-group">
                <label>NPP</label>
                <label class="form-group-control">
                    <input type="hidden" class="userId"/>
                    <input type="text" class="form-control npp" placeholder="..."/>
                </label>
                <div class="info-alert-text error nppError hidden">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="nppErrorText"></div>
                </div>
            </div>
            <div class="form-group">
                <label>Nama Karyawan</label>
                <label class="form-group-control">
                    <input type="text" class="form-control namaKaryawan" placeholder="..."/>
                </label>
                <div class="info-alert-text error namaKaryawanError hidden">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="namaKaryawanErrorText"></div>
                </div>
            </div>
            <div class="form-group">
                <label>Email</label>
                <label class="form-group-control">
                    <input type="text" class="form-control emailKaryawan" placeholder="..."/>
                    <input type="hidden" class="emailKaryawanOld"/>
                </label>
                <div class="info-alert-text error emailKaryawanError hidden">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="emailKaryawanErrorText"></div>
                </div>
            </div>
            <div class="form-group">
                <label>Password</label>
                <label class="form-group-control relative">
                    <input type="password" class="form-control passwordKaryawan" placeholder="..."/>
                    <a class="flex btnLookPassword absolute right-[0.5rem]">
                        <i class="fas fa-eye-slash"></i>
                    </a>
                </label>
                <div class="info-alert-text error passwordKaryawanError hidden">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="passwordKaryawanErrorText"></div>
                </div>
            </div>
            <div class="form-group">
                <label>Ulangi Password</label>
                <label class="form-group-control relative">
                    <input type="password" class="form-control rePasswordKaryawan" placeholder="..."/>
                    <a class="flex btnLookRePassword absolute right-[0.5rem]">
                        <i class="fas fa-eye-slash"></i>
                    </a>
                </label>
                <div class="info-alert-text error rePasswordKaryawanError hidden">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="rePasswordKaryawanErrorText"></div>
                </div>
            </div>
            <div class="form-group">
                <label>Timezone</label>
                <label class="form-group-control">
                    <select class="form-control select2-custom timezone">
                        <option value="">...</option>
                        <option value="Asia/Jakarta">Asia/Jakarta</option>
                        <option value="Asia/Makassar">Asia/Makassar</option>
                        <option value="Asia/Jayapura">Asia/Jayapura</option>
                    </select>
                </label>
                <div class="info-alert-text error timezoneError hidden">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="timezoneErrorText"></div>
                </div>
            </div>
            <div class="form-group">
                <label>Role</label>
                <label class="form-group-control">
                    <select class="form-control select2-custom roleId">
                        <option value="">...</option>
                        @if(isset($roles))
                            @foreach($roles as $item)
                                <option value="{{ $item->id }}">{{ $item->role }}</option>
                            @endforeach
                        @endif
                    </select>
                </label>
                <div class="info-alert-text error roleError hidden">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="roleErrorText"></div>
                </div>
            </div>
            <div class="form-group">
                <label>Status Karyawan</label>
                <label class="form-group-control">
                    <select class="form-control select2-custom statusKaryawan">
                        <option value="1">Active</option>
                        <option value="0">Non Active</option>
                    </select>
                </label>
                <div class="info-alert-text error roleError hidden">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="roleErrorText"></div>
                </div>
            </div>
        </div>
        <div class="modal-footer justify-between">
            <div>
                <a class="btn btn-error text-white hidden btnHapus">
                    <i class="fas fa-trash"></i>
                </a>
            </div>
            <div class="ml-auto">
                <button class="btn btn-primary btnSimpan">
                    <i class="fas fa-save mr-2"></i> Simpan
                </button>
            </div>
        </div>
    </div>
</div>
