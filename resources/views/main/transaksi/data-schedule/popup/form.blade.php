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
                <label>Judul Agenda</label>
                <label class="form-group-control">
                    <input type="hidden" class="jadwalId"/>
                    <input type="text" class="form-control judulJadwal" placeholder="..."/>
                </label>
                <div class="info-alert-text error judulJadwalError hidden">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="judulJadwalErrorText"></div>
                </div>
            </div>
            <div class="form-group">
                <label>Kategori</label>
                <label class="form-group-control">
                    <select class="form-control select2-custom kategoriJadwal">
                        <option value="">...</option>
                        @foreach($dataKategori as $item)
                            <option value="{{ $item->id }}">{{ $item->nama_kategori }}</option>
                        @endforeach
                    </select>
                </label>
                <div class="info-alert-text error kategoriJadwalError hidden">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="kategoriJadwalErrorText"></div>
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
                <label>Detail Agenda</label>
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
                <label>Lokasi / Venue</label>
                <label class="form-group-control">
                    <input type="text" class="form-control lokasiJadwal" placeholder="..."/>
                </label>
                <div class="info-alert-text error lokasiJadwalError hidden">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="lokasiJadwalErrorText"></div>
                </div>
            </div>
            <div class="form-group">
                <label>Sambutan</label>
                <label class="form-group-control">
                    <input type="text" class="form-control sambutanJadwal" placeholder="..."/>
                </label>
                <div class="info-alert-text error sambutanJadwalError hidden">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="sambutanJadwalErrorText"></div>
                </div>
            </div>
            <div class="form-group">
                <label>Protokoler</label>
                <label class="form-group-control">
                    <input type="text" class="form-control protokolerJadwal" placeholder="..."/>
                </label>
                <div class="info-alert-text error protokolerJadwalError hidden">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="protokolerJadwalErrorText"></div>
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
