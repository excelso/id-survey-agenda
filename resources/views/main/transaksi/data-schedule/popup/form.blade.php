<div class="modal hidden modalForm">
    <div class="modal-main">
        <div class="modal-head">
            <div class="flex justify-between items-center">
                <div class="modal-title">
                    <i class="fas fa-plus-circle mr-2"></i> Tambah Jadwal
                </div>
                <div>
                    <div class="cursor-pointer closeModalForm">
                        <i class="fas fa-close"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-body overflow-y-auto !max-h-[600px]">
            <div class="form-group">
                <label>Judul</label>
                <label class="form-group-control">
                    <input type="hidden" class="jadwalId"/>
                    <input type="text" class="form-control judulJadwal" placeholder="..."/>
                </label>
                <div class="info-alert-text error judulJadwalError hidden">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="judulJadwalErrorText"></div>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="col-span-1">
                    <div class="form-group">
                        <label>Tanggal Mulai</label>
                        <label class="form-group-control">
                            <input type="text" class="form-control tanggalStart datetimepickerStart" placeholder="..."/>
                        </label>
                        <div class="info-alert-text error tanggalStartError hidden">
                            <i class="fas fa-exclamation-circle"></i>
                            <div class="tanggalStartErrorText"></div>
                        </div>
                    </div>
                </div>
                <div class="col-span-1">
                    <div class="form-group">
                        <label>Tanggal Selesai</label>
                        <label class="form-group-control">
                            <input type="text" class="form-control tanggalUntil datetimepickerUntil" placeholder="..."/>
                        </label>
                        <div class="info-alert-text error tanggalUntilError hidden">
                            <i class="fas fa-exclamation-circle"></i>
                            <div class="tanggalUntilErrorText"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>Lokasi</label>
                <label class="form-group-control">
                    <input type="text" class="form-control lokasiJadwal" placeholder="..."/>
                </label>
                <div class="info-alert-text error lokasiJadwalError hidden">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="lokasiJadwalErrorText"></div>
                </div>
            </div>
            <div class="form-group">
                <label>Detail Jadwal</label>
                <label class="form-group-control">
                    <textarea class="form-control detailJadwal" rows="3" placeholder="..."></textarea>
                </label>
                <div class="info-alert-text error detailJadwalError hidden">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="detailJadwalErrorText"></div>
                </div>
            </div>
            <div class="form-group">
                <label>Notes</label>
                <label class="form-group-control">
                    <input type="text" class="form-control notesJadwal" placeholder="..."/>
                </label>
                <div class="info-alert-text error notesJadwalError hidden">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="notesJadwalErrorText"></div>
                </div>
            </div>
            <div class="form-group">
                <label>Prioritas</label>
                <label class="form-group-control">
                    <select class="form-control select2-custom prioritasJadwal">
                        <option value="">...</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </label>
                <div class="info-alert-text error prioritasJadwalError hidden">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="prioritasJadwalErrorText"></div>
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
