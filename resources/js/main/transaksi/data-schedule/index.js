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
    const notesJadwalError = document.querySelector('.notesJadwalError')
    const notesJadwalErrorText = document.querySelector('.notesJadwalErrorText')
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
        dateClick: function(info) {

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
        eventClick: function (info) {
            console.log(info.event.extendedProps)
        },
        contentHeight: window.innerHeight - 340,
        nowIndicator: true,
        eventDidMount: function (info) {
            const {detail} = info.event.extendedProps
            info.el.childNodes.forEach((elm) => {
                elm.childNodes.forEach((elmChilds) => {
                    if (typeof elmChilds.querySelector !== 'undefined') {
                        const fcEventTitleContainer = elmChilds.querySelector('.fc-event-title-container')
                        const fcEventTitle = elmChilds.querySelector('.fc-event-title')
                        fcEventTitleContainer.classList.add('!grow-[0]')
                        fcEventTitle.classList.add('truncate')
                    }
                })
                $(elm.childNodes).append(`
                    <div class="truncate">${detail}</div>
                `)
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

    renderCalendarView('timeGridWeek')
    const roleExTabs = document.querySelector('[role="exTabs"]')
    const roleExTabsChilds = roleExTabs.querySelectorAll('li a')
    roleExTabsChilds.forEach((elm) => {
        elm.addEventListener('click', function () {
            const dataTarget = elm.getAttribute('data-tabs-target')
            roleExTabsChilds.forEach(x => $(x).removeClass('text-white bg-blue-600'))
            $(elm).addClass('text-white bg-blue-600')

            if (dataTarget === '#dTab') {
                renderCalendarView('timeGridDay')
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
                        hiddenElm(notesJadwalError)
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
                                    prioritas: prioritasJadwal.value,
                                })
                            })

                            const {status} = response
                            const {message, errorValidation} = await response.json()
                            if (status === 200) {
                                successAlert({
                                    title: 'Berhasil',
                                    html: message,
                                    confirmButtonText: 'Tutup'
                                }, () => {
                                    closeAlert()
                                    calendar.addEvent({
                                        title: judulJadwal.value,
                                        start: moment(tanggalStart.value).format('YYYY-MM-DDTHH:mm:ss'),
                                        end: moment(tanggalUntil.value).format('YYYY-MM-DDTHH:mm:ss'),
                                        color: handlePriorityColor(prioritasJadwal.value),
                                        extendedProps: {
                                            detail: detailJadwal.value
                                        }
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

})
