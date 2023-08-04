import {Calendar} from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import moment from "moment";
import localization from 'moment/dist/locale/id'
import {closeModalDialog, showModalDialog} from "@/js/plugins/modal";
import {closeAlert, confirmAlert, failureAlert, successAlert, waitLoader} from "@/js/plugins/sweet-alert"
import {getMetaContent, handlePriorityColor, hiddenElm} from "@/js/plugins/functions"
import {setTriggerSelected} from "@/js/plugins/select2-custom";

moment.updateLocale('id', localization)

document.addEventListener('DOMContentLoaded', function () {
    const csrfToken = getMetaContent('csrf-token')
    const btnTambah = document.querySelector('.btnTambah')
    const modalForm = document.querySelector('.modalForm')
    const closeModalForm = document.querySelectorAll('.closeModalForm')
    const jadwalId = document.querySelector('.jadwalId')
    const judulJadwal = document.querySelector('.judulJadwal')
    const judulJadwalError = document.querySelector('.judulJadwalError')
    const judulJadwalErrorText = document.querySelector('.judulJadwalErrorText')
    const tanggalStart = document.querySelector('.tanggalStart')
    const tanggalStartError = document.querySelector('.tanggalStartError')
    const tanggalStartErrorText = document.querySelector('.tanggalStartErrorText')
    const tanggalUntil = document.querySelector('.tanggalUntil')
    const tanggalUntilError = document.querySelector('.tanggalUntilError')
    const tanggalUntilErrorText = document.querySelector('.tanggalUntilErrorText')
    const lokasiJadwal = document.querySelector('.lokasiJadwal')
    const lokasiJadwalError = document.querySelector('.lokasiJadwalError')
    const lokasiJadwalErrorText = document.querySelector('.lokasiJadwalErrorText')
    const detailJadwal = document.querySelector('.detailJadwal')
    const detailJadwalError = document.querySelector('.detailJadwalError')
    const detailJadwalErrorText = document.querySelector('.detailJadwalErrorText')
    const notesJadwal = document.querySelector('.notesJadwal')
    const sambutanJadwal = document.querySelector('.sambutanJadwal')
    const protokolerJadwal = document.querySelector('.protokolerJadwal')
    const prioritasJadwal = document.querySelector('.prioritasJadwal')
    const prioritasJadwalError = document.querySelector('.prioritasJadwalError')
    const prioritasJadwalErrorText = document.querySelector('.prioritasJadwalErrorText')
    const btnSimpan = document.querySelector('.btnSimpan')
    const btnHapus = document.querySelector('.btnHapus')

    const titleCalendar = document.querySelector('.titleCalendar')
    const btnToday = document.querySelector('.btnToday')
    const btnPrevMonth = document.querySelector('.btnPrevMonth')
    const btnNextMonth = document.querySelector('.btnNextMonth')
    const calendarEl = document.getElementById('calendar')

    if (closeModalForm) {
        closeModalForm.forEach((elm) => {
            elm.addEventListener('click', function () {
                closeModalDialog(modalForm)
            })
        })
    }

    //region Handle Calendar
    const calendar = new Calendar(calendarEl, {
        locale: 'id',
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
        headerToolbar: false,
        selectable: true,
        initialView: 'timeGridWeek',
        dateClick: function (info) {

        },
        views: {
            dayGridMonth: {
                dayHeaderFormat: {
                    weekday: 'long'
                }
            },
            timeGridWeek: {
                dayHeaderFormat: {
                    day: '2-digit',
                    weekday: 'long',
                }
            }
        },
        eventTimeFormat: {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        },
        slotLabelFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        },
        eventClick: handleUpdate,
        contentHeight: window.innerHeight - 340,
        nowIndicator: true,
        eventDidMount: function (info) {
            const {detail, lokasi, notes, sambutan, protokoler, user} = info.event.extendedProps
            const {name} = user
            info.el.childNodes.forEach((elm) => {
                elm.childNodes.forEach((elmChilds) => {
                    if (typeof elmChilds.querySelector !== 'undefined') {
                        const fcEventTitleContainer = elmChilds.querySelector('.fc-event-title-container')
                        const fcEventTitle = elmChilds.querySelector('.fc-event-title')
                        if (fcEventTitleContainer) {
                            fcEventTitleContainer.classList.add('!grow-[0]')
                        }
                        if (fcEventTitle) {
                            fcEventTitle.classList.add('truncate')
                        }
                    }
                })

                let detailInfo = `<div class="truncate mb-2 text-[14px]">${detail}</div>`
                let lokasiInfo = ``
                let sambuatanInfo = ``
                let protokolerInfo = ``
                let notesInfo = ``
                let userCreateInfo = ``
                if (info.view.type === 'listWeek') {
                    lokasiInfo = `
                        <div class="truncate mb-2 text-[14px]">
                            <div>
                                <div class="font-bold">Lokasi / Venue</div>
                                <div>
                                    <i class="fa fa-location-dot mr-1"></i> ${lokasi}
                                </div>
                            </div>
                        </div>
                    `

                    if (sambutan !== null && sambutan !== '') {
                        sambuatanInfo = `
                            <div class="truncate mb-2 text-[14px]">
                                <div>
                                    <div class="font-bold">Sambutan</div>
                                    <div>
                                        <i class="far fa-note-sticky mr-1"></i> ${sambutan}
                                    </div>
                                </div>
                            </div>
                        `
                    }

                    if (protokoler !== null && protokoler !== '') {
                        protokolerInfo = `
                            <div class="truncate mb-2 text-[14px]">
                                <div>
                                    <div class="font-bold">Protokoler</div>
                                    <div>
                                        <i class="far fa-user mr-1"></i> ${protokoler}
                                    </div>
                                </div>
                            </div>
                        `
                    }

                    if (notes !== null && notes !== '') {
                        notesInfo = `
                            <div class="truncate mb-2 text-[14px]">
                                <div>
                                    <div class="font-bold">Notes</div>
                                    <div>
                                        <i class="far fa-note-sticky mr-1"></i> ${notes}
                                    </div>
                                </div>
                            </div>
                        `
                    }

                    userCreateInfo = `
                        <div class="truncate mt-5 text-[12px] italic">
                            by ${name}
                        </div>
                    `
                }

                $(elm.childNodes).append(`
                    ${detailInfo}
                    ${lokasiInfo}
                    ${sambuatanInfo}
                    ${protokolerInfo}
                    ${notesInfo}
                    ${userCreateInfo}
                `)
            })

            const fcListEventGraphic = info.el.querySelectorAll('.fc-list-event-graphic')
            fcListEventGraphic.forEach((elm) => {
                elm.classList.add('!pt-[15px]')
            })
        },
        // now: '2023-07-27T22:00:00'
    })
    calendar.render()

    $(titleCalendar).text(calendar.getCurrentData().viewTitle)
    btnToday.addEventListener('click', function () {
        calendar.today()
        handleTitleButton()
    })

    btnPrevMonth.addEventListener('click', function () {
        calendar.prev()
        handleTitleButton()
    })

    btnNextMonth.addEventListener('click', function () {
        calendar.next()
        handleTitleButton()
    })

    function handleTitleButton() {
        $(titleCalendar).text(calendar.getCurrentData().viewTitle)
        if (moment(calendar.getDate()).format('DDMMYYYY') !== moment().format('DDMMYYYY')) {
            $(btnToday).removeClass('btn-primary')
            $(btnToday).addClass('btn-white')
        } else {
            $(btnToday).removeClass('btn-white')
            $(btnToday).addClass('btn-primary')
        }
    }

    function renderCalendarView(viewType) {
        calendar.changeView(viewType)
        $(titleCalendar).text(calendar.getCurrentData().viewTitle)
        const timeNowIndicator = document.querySelector('.fc .fc-timegrid-now-indicator-arrow')
        $(timeNowIndicator).html(`
            <div class="time-now">
                ${moment().format('HH:mm')}
            </div>
        `)
    }

    renderCalendarView('listWeek')
    const roleExTabs = document.querySelector('[role="exTabs"]')
    const roleExTabsChilds = roleExTabs.querySelectorAll('li a')
    roleExTabsChilds.forEach((elm) => {
        elm.addEventListener('click', function () {
            const dataTarget = elm.getAttribute('data-tabs-target')
            roleExTabsChilds.forEach(x => $(x).removeClass('text-white bg-blue-600'))
            $(elm).addClass('text-white bg-blue-600')

            if (dataTarget === '#dTab') {
                renderCalendarView('listWeek')
            }

            if (dataTarget === '#mTab') {
                renderCalendarView('dayGridMonth')
            }

            if (dataTarget === '#wTab') {
                renderCalendarView('timeGridWeek')
            }
        })
    })
    //endregion

    const handleLoadAgenda = async () => {
        const response = await fetch(`/trans/schedule/load-agenda`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            }
        })

        const {status} = response
        const {message, data} = await response.json()
        if (status === 200) {
            if (data.length !== 0) {
                const dataEvents = []
                data.map((item) => {
                    const {id, judul, tanggal_start, tanggal_until, prioritas} = item
                    dataEvents.push({
                        id: id,
                        title: judul,
                        start: moment(tanggal_start).format('YYYY-MM-DDTHH:mm:ss'),
                        end: moment(tanggal_until).format('YYYY-MM-DDTHH:mm:ss'),
                        color: handlePriorityColor(prioritas),
                        extendedProps: item,
                    })
                })

                calendar.addEventSource(dataEvents)
            }
        }
    }

    handleLoadAgenda().then(null)

    //region Handle Tambah
    if (btnTambah) {
        btnTambah.addEventListener('click', function () {
            showModalDialog(modalForm, '<i class="fas fa-plus-circle mr-2"></i> Tambah Agenda', () => {

                btnSimpan.addEventListener('click', function () {
                    confirmAlert({
                        title: 'Konfirmasi',
                        html: 'Apakah akan membuat Agenda baru?',
                        confirmButtonText: 'Ya, Simpan',
                        showDenyButton: true,
                        denyButtonText: 'Tidak'
                    }, async () => {
                        hiddenElm(judulJadwalError)
                        hiddenElm(tanggalStartError)
                        hiddenElm(tanggalUntilError)
                        hiddenElm(lokasiJadwalError)
                        hiddenElm(detailJadwalError)
                        hiddenElm(prioritasJadwalError)

                        await waitLoader('Mohon Tunggu...', 'Menyimpan data Agenda', async () => {
                            const response = await fetch(`/trans/schedule/store`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-CSRF-TOKEN': csrfToken
                                },
                                body: JSON.stringify({
                                    judul: judulJadwal.value,
                                    tanggal_start: tanggalStart.value,
                                    tanggal_until: tanggalUntil.value,
                                    detail: detailJadwal.value,
                                    lokasi: lokasiJadwal.value,
                                    notes: notesJadwal.value,
                                    sambutan: sambutanJadwal.value,
                                    protokoler: protokolerJadwal.value,
                                    prioritas: prioritasJadwal.value,
                                })
                            })

                            const {status} = response
                            const {message, jadwal_id, user, errorValidation} = await response.json()
                            if (status === 200) {
                                successAlert({
                                    title: 'Berhasil',
                                    html: message,
                                    confirmButtonText: 'Tutup'
                                }, () => {
                                    closeModalDialog(modalForm, () => {
                                        calendar.addEvent({
                                            id: jadwal_id,
                                            title: judulJadwal.value,
                                            start: moment(tanggalStart.value).format('YYYY-MM-DDTHH:mm:ss'),
                                            end: moment(tanggalUntil.value).format('YYYY-MM-DDTHH:mm:ss'),
                                            color: handlePriorityColor(prioritasJadwal.value),
                                            extendedProps: {
                                                id: jadwal_id,
                                                judul: judulJadwal.value,
                                                tanggal_start: tanggalStart.value,
                                                tanggal_until: tanggalUntil.value,
                                                detail: detailJadwal.value,
                                                lokasi: lokasiJadwal.value,
                                                notes: notesJadwal.value,
                                                prioritas: prioritasJadwal.value,
                                                user: user
                                            }
                                        })
                                    })
                                })
                            } else {
                                if (errorValidation) {
                                    closeAlert()
                                } else {
                                    failureAlert({
                                        html: message,
                                        confirmButtonText: 'Tutup'
                                    })
                                }
                            }
                        })
                    })
                })
            })
        })
    }

    //endregion

    function handleUpdate(info) {
        showModalDialog(modalForm, '<i class="fas fa-edit mr-2"></i> Edit Agenda', () => {
            const {
                id,
                judul,
                tanggal_start,
                tanggal_until,
                lokasi,
                detail,
                notes,
                sambutan,
                protokoler,
                prioritas
            } = info.event.extendedProps

            jadwalId.value = id
            judulJadwal.value = judul
            tanggalStart.value = tanggal_start
            tanggalUntil.value = tanggal_until
            lokasiJadwal.value = lokasi
            detailJadwal.value = detail
            notesJadwal.value = notes
            sambutanJadwal.value = sambutan
            protokolerJadwal.value = protokoler
            setTriggerSelected(prioritasJadwal, prioritas)

            btnSimpan.addEventListener('click', function () {
                confirmAlert({
                    title: 'Konfirmasi',
                    html: 'Apakah akan mengubah Agenda ini?',
                    confirmButtonText: 'Ya, Simpan',
                    showDenyButton: true,
                    denyButtonText: 'Tidak'
                }, async () => {
                    hiddenElm(judulJadwalError)
                    hiddenElm(tanggalStartError)
                    hiddenElm(tanggalUntilError)
                    hiddenElm(lokasiJadwalError)
                    hiddenElm(detailJadwalError)
                    hiddenElm(prioritasJadwalError)

                    await waitLoader('Mohon Tunggu...', 'Menyimpan data Agenda', async () => {
                        const response = await fetch(`/trans/schedule/update`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRF-TOKEN': csrfToken
                            },
                            body: JSON.stringify({
                                id: jadwalId.value,
                                judul: judulJadwal.value,
                                tanggal_start: tanggalStart.value,
                                tanggal_until: tanggalUntil.value,
                                detail: detailJadwal.value,
                                lokasi: lokasiJadwal.value,
                                notes: notesJadwal.value,
                                sambutan: sambutanJadwal.value,
                                protokoler: protokolerJadwal.value,
                                prioritas: prioritasJadwal.value,
                            })
                        })

                        const {status} = response
                        const {message, data, user, errorValidation} = await response.json()
                        if (status === 200) {
                            successAlert({
                                title: 'Berhasil',
                                html: message,
                                confirmButtonText: 'Tutup'
                            }, () => {
                                closeModalDialog(modalForm, () => {
                                    const event = calendar.getEventById(jadwalId.value)
                                    event.remove()

                                    calendar.addEvent({
                                        id: jadwalId.value,
                                        title: judulJadwal.value,
                                        start: moment(tanggalStart.value).format('YYYY-MM-DDTHH:mm:ss'),
                                        end: moment(tanggalUntil.value).format('YYYY-MM-DDTHH:mm:ss'),
                                        color: handlePriorityColor(prioritasJadwal.value),
                                        extendedProps: {
                                            id: jadwalId.value,
                                            judul: judulJadwal.value,
                                            tanggal_start: tanggalStart.value,
                                            tanggal_until: tanggalUntil.value,
                                            detail: detailJadwal.value,
                                            lokasi: lokasiJadwal.value,
                                            notes: notesJadwal.value,
                                            sambutan: sambutanJadwal.value,
                                            protokoler: protokolerJadwal.value,
                                            prioritas: prioritasJadwal.value,
                                            user: user
                                        }
                                    })
                                })
                            })
                        } else {
                            if (errorValidation) {
                                closeAlert()
                            } else {
                                failureAlert({
                                    html: message,
                                    confirmButtonText: 'Tutup'
                                })
                            }
                        }
                    })
                })
            })
        })
    }

})
