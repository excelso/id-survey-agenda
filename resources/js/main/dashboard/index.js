import {Calendar} from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import moment from "moment";
import localization from 'moment/dist/locale/id'
import {getMetaContent, handlePriorityColor} from "@/js/plugins/functions";
import {failureAlert} from "@/js/plugins/sweet-alert";
import DOMPurify from "isomorphic-dompurify";
import {marked} from "marked";
moment.updateLocale('id', localization)

document.addEventListener('DOMContentLoaded', function () {
    const csrfToken = getMetaContent('csrf-token')
    const titleCalendar = document.querySelector('.titleCalendar')
    const btnToday = document.querySelector('.btnToday')
    const btnPrevMonth = document.querySelector('.btnPrevMonth')
    const btnNextMonth = document.querySelector('.btnNextMonth')
    const calendarEl = document.getElementById('calendar')
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
            const {detail, lokasi, notes, sambutan, protokoler, user, kategori} = info.event.extendedProps
            const {name} = user
            const {nama_kategori, color} = kategori
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
            })

            const fcListEventTitle = info.el.querySelectorAll('.fc-list-event-title')

            let detailInfo = `
                <div class="mb-2 text-[14px]">
                    ${DOMPurify.sanitize(marked(detail, {mangle: false, headerIds: false}))}
                </div>
            `
            let kategoriInfo = `<div class="mb-2 text-[12px] w-fit px-2 py-[1px] rounded-full" style="color: ${color}; border: 1px ${color} solid">${nama_kategori}</div>`
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
                        ${name}
                    </div>
                `
            }

            $(fcListEventTitle).append(`
                ${kategoriInfo}
                ${detailInfo}
                ${lokasiInfo}
                ${sambuatanInfo}
                ${protokolerInfo}
                ${notesInfo}
                ${userCreateInfo}
            `)

            const fcListEventGraphic = info.el.querySelectorAll('.fc-list-event-graphic')
            fcListEventGraphic.forEach((elm) => {
                elm.classList.add('!pt-[15px]')
            })
        },
        // now: '2023-07-27T22:00:00'
    })
    calendar.render()
    calendar.scrollToTime('12:30:00')

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
                    const {id, judul, tanggal_start, tanggal_until, kategori} = item
                    const {color} = kategori
                    dataEvents.push({
                        id: id,
                        title: judul,
                        start: moment(tanggal_start).format('YYYY-MM-DDTHH:mm:ss'),
                        end: moment(tanggal_until).format('YYYY-MM-DDTHH:mm:ss'),
                        color: color,
                        extendedProps: item,
                    })
                })

                calendar.addEventSource(dataEvents)
            }
        } else {
            failureAlert({
                html: message,
                confirmButtonText: 'Tutup'
            })
        }
    }

    handleLoadAgenda().then(null)
})
