import './bootstrap';
import 'flowbite';
import Alpine from 'alpinejs';
import {StartTextAnimation} from "@/js/plugins/text-animation"
import {MetisMenu} from 'metismenujs';
import 'metismenujs/sass';
import {
    checkClassList,
    getMetaContent,
    handleFixedTd, handleFixedTfootTh,
    handleFixedTheadTh, handleReadMoreText, hiddenElm, removeElmClass, setMetaContent,
    tableTooltip,
    throttle, triggerTableTooltip
} from "@/js/plugins/functions"
import {getDeviceConfig} from "@/js/plugins/breakpoint"
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import Select2Custom from "@/js/plugins/select2-custom"
import moment from "moment";
import {initializeApp} from "firebase/app"
import {getMessaging, getToken, onMessage} from "firebase/messaging"
import {firebaseStoreToken} from "@/js/firebase";
import Toasts from "@/js/plugins/toast";
import EasyMDE from "easymde/dist/easymde.min";
import "easymde/dist/easymde.min.css"
import {confirmAlert} from "@/js/plugins/sweet-alert";
import {readmore} from "@/js/plugins/readmore";

window.Alpine = Alpine;
Alpine.start();

document.addEventListener('DOMContentLoaded', function () {
    const csrfToken = getMetaContent('csrf-token')
    const npp = getMetaContent('npp')

    StartTextAnimation([
        "PRESENT",
        "AGENDA",
        "BY ID SURVEY 2023",
    ], 0)

    //region Handle Metis Menu
    const menu = document.querySelector('#menu')
    if (menu !== null) {
        new MetisMenu("#menu", {
            toggle: true,
            triggerElement: '.navLink'
        })
    }
    //endregion

    //region Setting Content Wrapper Height
    const contentWrapper = document.querySelector('.content-wrapper')
    if (contentWrapper !== null) {
        contentWrapper.style.minHeight = `${window.innerHeight}px`
        window.addEventListener('resize', function () {
            contentWrapper.style.minHeight = `${window.innerHeight}px`
        })
    }
    //endregion

    /*region Toogle Sidebar */
    const wrapper = document.querySelector('.wrapper')
    const sidebarOverlay = document.querySelector('.sidebar-overlay')
    const toogleSidebar = document.querySelector('.toggle-sidebar')
    const breakpoint = getDeviceConfig(window.innerWidth)

    if (wrapper !== null) {
        if (breakpoint === 'sm') {
            if (checkClassList(wrapper, 'sidebar-mini')) {
                wrapper.classList.remove('sidebar-mini')
                wrapper.classList.add('sidebar-close')
            }
        } else {
            wrapper.classList.add('sidebar-mini')
            wrapper.classList.remove('sidebar-close')
        }
    }

    if (toogleSidebar !== null) {
        toogleSidebar.addEventListener('click', function () {
            const bp = getDeviceConfig(window.innerWidth)
            if (bp === 'sm') {
                if (checkClassList(wrapper, 'sidebar-close')) {
                    wrapper.classList.add('sidebar-open')
                    wrapper.classList.remove('sidebar-close')
                }
            } else {
                if (wrapper.classList.contains('sidebar-mini')) {
                    wrapper.classList.remove('sidebar-mini')
                } else if (!wrapper.classList.contains('sidebar-mini')) {
                    wrapper.classList.add('sidebar-mini')
                }
            }
        })
    }

    if (sidebarOverlay !== null) {
        sidebarOverlay.addEventListener('click', function () {
            const bp = getDeviceConfig(window.innerWidth)
            if (bp === 'sm') {
                if (checkClassList(wrapper, 'sidebar-open')) {
                    wrapper.classList.remove('sidebar-open')
                    wrapper.classList.add('sidebar-close')
                }
            }
        })
    }

    window.addEventListener('resize', function () {
        throttle(function () {
            const bp = getDeviceConfig(window.innerWidth)
            if (wrapper) {
                if (bp === 'sm') {
                    if (checkClassList(wrapper, 'sidebar-mini')) {
                        wrapper.classList.remove('sidebar-mini')
                        wrapper.classList.add('sidebar-close')
                    }
                } else {
                    wrapper.classList.add('sidebar-mini')
                    wrapper.classList.remove('sidebar-close')
                }
            }
        }, 200)
    })
    /*endregion*/

    //region Handle Notifikasi
    const toggleNotif = document.querySelector('.toggle-notif')
    const rightNavNotif = document.querySelector('.right-nav-notif')
    const closeNotif = document.querySelector('.close-notif')
    const notifOverlayElement = document.querySelector('.notifbar-overlay')
    const dataNotif = document.querySelector('.data-notif')
    const dataNotifEmpty = document.querySelector('.data-notif-empty')
    const dataCountNotif = document.querySelector('.data-count-notif')
    const countNotif = document.querySelector('.count-notif')
    const markAllRead = document.querySelector('.mark-all-read')

    const getDataNotifikasi = async () => {
        const response = await fetch('/notifikasi/data-notif', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            }
        })

        const {status} = response
        const {message, dataResponse} = await response.json()
        if (status === 200) {
            if (dataNotif !== null) {
                if (dataNotifEmpty !== null) {

                    const renderData = []
                    dataResponse.map((item) => {
                        const {id, nama_pengirim, title, detail, link, kategori, created_at, readed} = item

                        let notifUnRead = ''
                        if (readed === null) {
                            notifUnRead = 'notif-unread'
                        }

                        renderData.push(`
                            <div class="notif-item ${notifUnRead} btnReadNotif" data-link="${link}" data-notifikasi_id="${id}">
                                <div class="notif-item-info">
                                    <i class="fa fa-info-circle mr-1"></i>
                                    ${kategori} • ${moment(created_at).format('DD MMM YYYY')}
                                </div>
                                <div class="notif-item-title">${title}</div>
                                <div class="notif-item-detail">${detail}</div>
                                <div class="notif-item-footer">
                                    <i class="fa fa-user-circle mr-1"></i>
                                    ${nama_pengirim.split(' ').slice(0, 2).join(' ')}
                                </div>
                            </div>
                        `)
                    })

                    if (dataResponse.length !== 0) {
                        $(dataNotifEmpty).remove()
                        $(dataNotif).html(renderData)
                    }

                    const btnReadNotif = document.querySelectorAll('.btnReadNotif');
                    if (btnReadNotif !== null) {
                        btnReadNotif.forEach((el) => {
                            const dataLink = el.getAttribute('data-link')
                            const notifikasiId = el.getAttribute('data-notifikasi_id')
                            el.addEventListener('click', function () {
                                readNotifikasi(notifikasiId).then(() => {
                                    window.location.href = dataLink
                                })
                            })
                        })
                    }

                    if (!checkClassList(dataCountNotif, 'hidden')) {
                        dataCountNotif.classList.add('hidden')
                        $(countNotif).text('')
                    }
                }
            }
        } else {
            console.log(message)
        }
    }

    const getCountNotifikasi = async () => {
        const response = await fetch('/notifikasi/count-data-notif', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            }
        })

        const {status} = response
        const {message, dataResponse} = await response.json()
        if (status === 200) {
            if (dataCountNotif !== null) {
                if (countNotif !== null) {
                    if (dataResponse !== 0) {
                        if (checkClassList(dataCountNotif, 'hidden')) {
                            dataCountNotif.classList.remove('hidden')
                            $(countNotif).text(dataResponse > 9 ? '9+' : dataResponse)
                        }
                    } else {
                        if (!checkClassList(dataCountNotif, 'hidden')) {
                            dataCountNotif.classList.add('hidden')
                            $(countNotif).text('')
                        }
                    }
                }
            }
        } else {
            console.log(message)
        }
    }

    const readNotifikasi = (notifikasi_id) => {
        return new Promise(async (resolve) => {
            const response = await fetch('/notifikasi/read-notif', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({
                    notifikasi_id
                })
            })

            const {status} = response
            const {message} = await response.json()
            if (status === 200) {
                resolve()
            } else {
                console.log(message)
            }
        })
    }

    const markAllReadNotifikasi = async () => {
        const response = await fetch('/notifikasi/mark-all-read', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            }
        })

        const {status} = response
        const {message} = await response.json()
        if (status === 200) {
            const notifUnread = document.querySelectorAll('.notif-unread')
            notifUnread.forEach((el) => {
                if (checkClassList(el, 'bg-green-100')) {
                    el.classList.remove('bg-green-100')
                }
            })
        } else {
            console.log(message)
        }
    }

    if (rightNavNotif !== null) {
        getCountNotifikasi().then(null)
    }
    const handleToggleNotif = async () => {
        if (checkClassList(rightNavNotif, 'open')) {
            rightNavNotif.classList.add('close')
            rightNavNotif.classList.remove('open')
            notifOverlayElement.style.visibility = 'hidden'
            notifOverlayElement.style.opacity = '0'
        } else {
            rightNavNotif.classList.add('open')
            rightNavNotif.classList.remove('close')
            notifOverlayElement.style.visibility = 'visible'
            notifOverlayElement.style.opacity = '1'

            await getDataNotifikasi()
        }
    }

    if (toggleNotif !== null) {
        toggleNotif.addEventListener('click', async function () {
            await handleToggleNotif()
        })
    }

    if (closeNotif !== null) {
        closeNotif.addEventListener('click', async function () {
            await handleToggleNotif()
        })
    }

    if (notifOverlayElement !== null) {
        notifOverlayElement.addEventListener('click', async function () {
            await handleToggleNotif()
        })
    }

    if (markAllRead !== null) {
        markAllRead.addEventListener('click', async function () {
            await markAllReadNotifikasi()
        })
    }
    //endregion

    //region Handle Table Content
    const tableContent = document.querySelectorAll('.table-content')
    if (tableContent !== null) {
        tableContent.forEach((value) => {
            new PerfectScrollbar(value)
            value.style.maxHeight = `${window.innerHeight - 340}px`
        })
    }
    //endregion

    //region Handle Custom Select2
    new Select2Custom()
    //endregion

    //region Handle Masking Number Format
    const number = document.querySelectorAll('.number')
    if (number !== null) {
        number.forEach((elm) => {
            $(elm).inputmask("decimal", {
                min: 0,
                radixPoint: ".",
                autoGroup: true,
                groupSeparator: ",",
                groupSize: 3,
                autoUnmask: true,
                removeMaskOnSubmit: true
            })
        })
    }

    const numberText = document.querySelectorAll('.number-text')
    if (numberText !== null) {
        numberText.forEach((elm) => {
            $(elm).inputmask({
                mask: '9{1,15}',
                placeholder: '0'
            })
        })
    }

    const npwp = document.querySelectorAll('.npwp')
    if (npwp !== null) {
        npwp.forEach((elm) => {
            $(elm).inputmask({
                mask: '99.999.999.9-999.999',
                autoUnmask: true,
                removeMaskOnSubmit: true
            })
        })
    }

    const npwpAdd = document.querySelectorAll('.npwpAdd')
    if (npwpAdd !== null) {
        npwpAdd.forEach((elm) => {
            $(elm).inputmask({
                mask: '99.999.999.9-999.999',
                autoUnmask: true,
                removeMaskOnSubmit: true
            })
        })
    }
    //endregion

    //region Handle Sticky Header ketika Scrolling
    const contentHeader = document.querySelector(".content-header")
    if (contentHeader !== null) {
        const handleStickyHeader = () => {
            const scrolled = document.scrollingElement.scrollTop
            if (scrolled > 1) {
                contentHeader.classList.add('active')
            } else {
                contentHeader.classList.remove('active')
            }
        }

        handleStickyHeader()
        document.addEventListener('scroll', handleStickyHeader)
    }
    //endregion

    //region Handle Datepicker
    const datepicker = document.querySelectorAll('.datepicker')
    if (datepicker !== null) {
        datepicker.forEach((elm) => {
            $(elm).datetimepicker({
                timepicker: false,
                format: 'Y-m-d',
                scrollInput: false
            })
        })
    }

    const datetimepicker = document.querySelectorAll('.datetimepicker')
    if (datetimepicker !== null) {
        datetimepicker.forEach((elm) => {
            $(elm).datetimepicker({
                timepicker: true,
                format: 'Y-m-d H:i',
                scrollInput: false
            })
        })
    }

    const datepickerStart = document.querySelector('.datepickerStart')
    const datepickerUntil = document.querySelector('.datepickerUntil')
    if (datepickerStart && datepickerUntil) {
        $(datepickerStart).datetimepicker({
            format: 'Y-m-d',
            scrollInput: false,
            onShow: function (ct) {
                this.setOptions({
                    maxDate: jQuery(datepickerUntil).val() ? jQuery(datepickerUntil).val() : false
                })
            },
            timepicker: false
        });
        $(datepickerUntil).datetimepicker({
            format: 'Y-m-d',
            scrollInput: false,
            onShow: function (ct) {
                this.setOptions({
                    minDate: jQuery(datepickerStart).val() ? jQuery(datepickerStart).val() : false
                })
            },
            timepicker: false
        });
    }

    const datepickerStart2 = document.querySelector('.datepickerStart2')
    const datepickerUntil2 = document.querySelector('.datepickerUntil2')
    if (datepickerStart2 && datepickerUntil2) {
        $(datepickerStart2).datetimepicker({
            format: 'Y-m-d',
            scrollInput: false,
            onShow: function (ct) {
                this.setOptions({
                    maxDate: jQuery(datepickerUntil2).val() ? jQuery(datepickerUntil2).val() : false
                })
            },
            timepicker: false
        });
        $(datepickerUntil2).datetimepicker({
            format: 'Y-m-d',
            scrollInput: false,
            onShow: function (ct) {
                this.setOptions({
                    minDate: jQuery(datepickerStart2).val() ? jQuery(datepickerStart2).val() : false
                })
            },
            timepicker: false
        });
    }

    const datetimepickerStart = document.querySelector('.datetimepickerStart')
    const datetimepickerUntil = document.querySelector('.datetimepickerUntil')
    if (datetimepickerStart && datetimepickerUntil) {
        $(datetimepickerStart).datetimepicker({
            format: 'Y-m-d H:i',
            scrollInput: false,
            onShow: function (ct) {
                this.setOptions({
                    maxDate: jQuery(datetimepickerUntil).val() ? jQuery(datetimepickerUntil).val() : false
                })
            },
            timepicker: true
        });
        $(datetimepickerUntil).datetimepicker({
            format: 'Y-m-d H:i',
            scrollInput: false,
            onShow: function (ct) {
                this.setOptions({
                    minDate: jQuery(datetimepickerStart).val() ? jQuery(datetimepickerStart).val() : false
                })
            },
            timepicker: true
        });
    }
    //endregion

    //region Handle FCM Notifikasi
    // const firebaseConfig = {
    //     apiKey: "AIzaSyCKj9hJgLCgmTPi_BSl1tZxwnNXOdNPfmY",
    //     authDomain: "sucofindo-crm.firebaseapp.com",
    //     projectId: "sucofindo-crm",
    //     storageBucket: "sucofindo-crm.appspot.com",
    //     messagingSenderId: "352080572976",
    //     appId: "1:352080572976:web:df48a91fe8d53c0e56f3f5",
    //     measurementId: "G-SHXWLKNQ5R"
    // };
    //
    // const toasts = new Toasts({
    //     width: 300,
    //     timing: 'ease',
    //     duration: '.5s',
    //     dimOld: true,
    //     position: 'top-right'
    // });
    //
    // const handleFirebaseMessage = (messaging) => {
    //     onMessage(messaging, (payload) => {
    //         const {data} = payload
    //         const {notification, user_receiver_npp} = data
    //         const {title, body} = JSON.parse(notification)
    //         if (rightNavNotif !== null) {
    //             if (parseInt(user_receiver_npp) === parseInt(npp)) {
    //                 getCountNotifikasi().then(null)
    //                 toasts.push({
    //                     title,
    //                     content: body,
    //                     style: 'dark',
    //                     closeButton: true
    //                 })
    //             }
    //         }
    //     })
    // }
    //
    // const handleFirebase = () => {
    //     const messaging = getMessaging();
    //     getToken(messaging, {vapidKey: 'BGG82Vv0ZdMURKOxxEMkio8jL6JqP_lJWF6RJ_P_TqjCXfwnRZK8Xc4DPbwi4sOXJaGT_oYuCeH6ArJAl4-2nTY'}).then((currentToken) => {
    //         if (currentToken) {
    //             // Store Firebase Token ke Database
    //             firebaseStoreToken({
    //                 csrfToken,
    //                 firebaseReqToken: currentToken
    //             }).then(null)
    //         } else {
    //             console.log('No registration token available. Request permission to generate one.')
    //         }
    //     }).catch((err) => {
    //         console.log('An error occurred while retrieving token. ', err)
    //     })
    // }
    //
    // initializeApp(firebaseConfig);
    // if ('serviceWorker' in navigator) {
    //     navigator.serviceWorker.register('/firebase-messaging-sw.js')
    //         .then((register) => {
    //             if (("Notification" in window)) {
    //                 if (Notification.permission !== 'granted') {
    //                     confirmAlert({
    //                         html: `
    //                             <div class="font-bold">Permintaan Notifikasi</div>
    //                             <div>Mohon Aktifkan Notifikasi pada Browser Anda</div>
    //                         `,
    //                         confirmButtonText: 'Oke, Aktifkan',
    //                         allowOutsideClick: false
    //                     }, () => {
    //                         Notification.requestPermission().then((permission) => {
    //                             if (permission === "granted") {
    //                                 handleFirebase()
    //                             }
    //                         });
    //                     })
    //                 } else {
    //                     handleFirebase()
    //                 }
    //             }
    //         })
    // } else {
    //     console.log('Service Worker not supported')
    // }

    // Handle Message Firebase pakai Worker
    // if (typeof navigator.serviceWorker !== 'undefined') {
    //     navigator.serviceWorker.onmessage = (event) => {
    //         const {data} = event
    //         const {data: dataNotifikasi} = data
    //         const {notification, user_receiver_npp} = dataNotifikasi
    //         const {title, body} = JSON.parse(notification)
    //
    //         if (parseInt(user_receiver_npp) === parseInt(npp)) {
    //             if (rightNavNotif !== null) {
    //                 getCountNotifikasi().then(null)
    //                 new Notification(title, {body, icon: '/images/logo-sucofindo-white.png'})
    //             }
    //         }
    //     }
    // }
    //endregion

    //region Handle Tooltip in Table
    tableTooltip()
    //endregion

    //region Handle Fixed Table
    handleFixedTheadTh()
    handleFixedTd()
    handleFixedTfootTh()
    window.addEventListener('resize', function () {
        handleFixedTheadTh()
        handleFixedTd()
        handleFixedTfootTh()
    })
    //endregion

    //region Handle Long Text - Read More
    readmore()
    //endregion

    //region Handle Markdown Editor di Textarea
    const simplemdeElm = document.querySelectorAll('.simplemde-elm')
    simplemdeElm.forEach((elm) => {
        const dataMaxHeight = elm.getAttribute('data-max-height')
        new EasyMDE({
            element: elm,
            hideIcons: ['guide', 'heading', 'image', 'horizontal-rule', 'unordered-list', 'side-by-side', 'fullscreen'],
            spellChecker: false,
            status: false,
            maxHeight: dataMaxHeight ? dataMaxHeight : '120px'
        })
    })
    //endregion

})
