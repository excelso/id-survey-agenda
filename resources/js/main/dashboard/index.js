import {Calendar} from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import moment from "moment";
import localization from 'moment/dist/locale/id'
moment.updateLocale('id', localization)

document.addEventListener('DOMContentLoaded', function () {
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
        // now: '2023-07-27T22:00:00'
    })
    calendar.render()
    calendar.addEventSource([{
        title: 'Meeting dengan Client 1',
        start: '2023-07-23T12:30:00',
        end: '2023-07-23T13:30:00',
        color: '#518105',
        extendedProps: {
            description: 'Test 1'
        },
    },{
        title: 'Zoom Meeting',
        start: '2023-07-24T14:30:00',
        end: '2023-07-24T15:30:00',
        extendedProps: {
            description: 'Test 2'
        },
    }])
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
})
