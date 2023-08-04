import Select2Custom from "@/js/plugins/select2-custom"
import {insertAfter} from "@/js/plugins/functions";

export default class DataKaryawan {
    constructor(selector) {
        const karyawanId = document.querySelector('.karyawanId')
        this.selector = typeof selector !== 'undefined' ? selector : karyawanId

        this.options = {
            minimumInputLength: 3,
            placeholder: '...',
            language: {
                inputTooShort: function () {
                    return 'Pencarian data Karyawan minimal 3 karakter...';
                },
                noResults: function(){
                    return `
                        <div class="px-2 py-3 !text-[14px]">
                            Oppss! Data Karyawan tidak ditemukan!
                        </div>
                    `;
                },
                searching: function () {
                    return `
                        <div class="px-2 py-3 !text-[14px]">
                            <i class="fas fa-spinner fa-pulse mr-2"></i> Mohon Tunggu...
                        </div>
                    `;
                }
            },
            escapeMarkup: function(markup) {
                return markup;
            },
            ajax: {
                url: '/master/karyawan/lookup-by-name-api',
                dataType: "json",
                delay: 1250,
                type: "GET",
                data: function (params) {
                    return {
                        term: params.term.toLowerCase()
                    };
                },
                processResults: function (dataResp) {
                    const {data} = dataResp
                    return {
                        results: $.map(data, function (item) {
                            const {sales_npp, nama_karyawan, email, jabatan} = item
                            return {
                                text: nama_karyawan,
                                id: sales_npp,
                                additional: jabatan + '#' + email,
                                source: item,
                            }
                        })
                    };
                }
            }
        }

        new Select2Custom(this.selector, this.options)

        if (this.selector !== null) {
            const karyawanSelected = this.selector.getAttribute('data-selected')
            if (karyawanSelected !== '') {
                const karyawanParse = JSON.parse(karyawanSelected.replace(/&amp;quot;/g, "\"").replace(/&quot;/g, "\""))
                if (Object.keys(karyawanParse).length !== 0) {
                    const {sales_npp, nama_karyawan, email, jabatan} = karyawanParse
                    this.options = {
                        ...this.options,
                        data: [{
                            text: nama_karyawan,
                            id: sales_npp,
                            additional: jabatan + '#' + email,
                            source: karyawanParse,
                            selected: true
                        }]
                    }

                    new Select2Custom(this.selector, this.options)
                }

                //region Contoh Lain
                /*$(this.selector).select2("trigger", "select", {
                        data: {
                            text: nama,
                            id: code,
                            additional: alamat,
                            source: karyawanParse,
                        }
                    }
                )*/
                //endregion
            }
        }
    }

    setSelected(karyawanSelected) {
        if (karyawanSelected !== '') {
            const karyawanParse = JSON.parse(karyawanSelected.replace(/&amp;quot;/g, "\"").replace(/&quot;/g, "\""))
            if (Object.keys(karyawanParse).length !== 0) {
                const {sales_npp, nama_karyawan, email, jabatan} = karyawanParse
                this.options = {
                    ...this.options,
                    data: [{
                        text: nama_karyawan,
                        id: sales_npp,
                        additional: jabatan + '#' + email,
                        source: karyawanParse,
                    }]
                }

                new Select2Custom(this.selector, this.options)

                //region Contoh Lain
                /*$(this.selector).select2("trigger", "select", {
                        data: {
                            text: nama,
                            id: code,
                            additional: alamat,
                            source: karyawanParse,
                        }
                    }
                )*/
                //endregion
            }
        }
    }
}
