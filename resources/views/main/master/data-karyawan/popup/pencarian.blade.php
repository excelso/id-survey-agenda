<div class="modal hidden modalPencarian">
    <div class="modal-main">
        <div class="modal-head">
            <div class="flex justify-between items-center">
                <div class="modal-title">
                    <i class="fas fa-search mr-2"></i> Pencarian
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
                    <input name="npp" class="form-control" value="{{isset($_GET['npp']) && $_GET['npp'] != '' ? $_GET['npp'] : ''}}" placeholder="..."/>
                </label>
            </div>
            <div class="form-group">
                <label>Nama Karyawan</label>
                <label class="form-group-control">
                    <input name="nama_karyawan" class="form-control" value="{{isset($_GET['nama_karyawan']) && $_GET['nama_karyawan'] != '' ? $_GET['nama_karyawan'] : ''}}" placeholder="..."/>
                </label>
            </div>
            <div class="form-group">
                <label>Email</label>
                <label class="form-group-control">
                    <input name="email" class="form-control" value="{{isset($_GET['email']) && $_GET['email'] != '' ? $_GET['email'] : ''}}" placeholder="..."/>
                </label>
            </div>
            <div class="form-group">
                <label>Timezone</label>
                <label class="form-group-control">
                    <select name="timezone" class="form-control select2-custom">
                        <option value="">...</option>
                        <option value="Asia/Jakarta" {{isset($_GET['timezone']) && $_GET['timezone'] == 'Asia/Jakarta' ? 'selected' : ''}}>Asia/Jakarta</option>
                        <option value="Asia/Makassar" {{isset($_GET['timezone']) && $_GET['timezone'] == 'Asia/Makassar' ? 'selected' : ''}}>Asia/Makassar</option>
                        <option value="Asia/Jayapura" {{isset($_GET['timezone']) && $_GET['timezone'] == 'Asia/Jayapura' ? 'selected' : ''}}>Asia/Jayapura</option>
                    </select>
                </label>
            </div>
            <div class="form-group">
                <label>Role</label>
                <label class="form-group-control">
                    <select name="role" class="form-control select2-custom">
                        <option value="">...</option>
                        <option value="1" {{isset($_GET['role']) && $_GET['role'] == '1' ? 'selected' : ''}}>Administrator</option>
                        <option value="2" {{isset($_GET['role']) && $_GET['role'] == '2' ? 'selected' : ''}}>Approval</option>
                        <option value="3" {{isset($_GET['role']) && $_GET['role'] == '3' ? 'selected' : ''}}>Account Partner</option>
                    </select>
                </label>
            </div>
            <div class="form-group">
                <label>Status Karyawan</label>
                <label class="form-group-control">
                    <select name="status" class="form-control select2-custom">
                        <option value="">...</option>
                        <option value="1" {{isset($_GET['status']) && $_GET['status'] == '1' ? 'selected' : ''}}>Active</option>
                        <option value="0" {{isset($_GET['status']) && $_GET['status'] == '0' ? 'selected' : ''}}>Non Active</option>
                    </select>
                </label>
            </div>
        </div>
        <div class="modal-footer justify-between">
            <div>
                <a href="/master/karyawan" class="ds-btn ds-btn-error btnResetPecarian">
                    <i class="fas fa-refresh"></i>
                </a>
            </div>
            <div class="ml-auto">
                <button type="submit" class="ds-btn ds-btn-primary normal-case btnCari">
                    <i class="fas fa-search mr-2"></i> Cari
                </button>
            </div>
        </div>
    </div>
</div>
