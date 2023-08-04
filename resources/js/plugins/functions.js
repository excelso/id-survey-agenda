import {getDeviceConfig} from "@/js/plugins/breakpoint";
import {Popover, Dropdown} from 'flowbite';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

let throttleTimer;

export const checkClassList = (elm, searchClassName) => {
    return elm.classList.contains(searchClassName)
}
export const showHiddenElmAndText = (elm, elmText, text) => {
    if (checkClassList(elm, 'hidden')) {
        elm.classList.remove('hidden')
        if (typeof elmText !== 'undefined') {
            if (typeof text !== 'undefined') {
                elmText.innerHTML = text
            }
        }
    }
}

export function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export const hiddenElm = (elm) => {
    if (!checkClassList(elm, 'hidden'))
        elm.classList.add('hidden')
}

export const removeElmClass = (elm, searchClassName) => {
    elm.classList.remove(searchClassName)
}

export const getMetaContent = (metaName) => {
    const metas = document.getElementsByTagName('meta');
    for (let i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('name') === metaName)
            return metas[i].getAttribute('content')
    }
    return undefined
}

export const setMetaContent = (metaName, content) => {
    const metas = document.getElementsByTagName('meta');
    for (let i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('name') === metaName)
            return metas[i].setAttribute('content', content)
    }
    return undefined
}

export const throttle = (callback, time) => {
    if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
        callback();
        throttleTimer = false;
    }, time);
}

export const stringToHTML = function (str) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(str, 'text/html')
    console.log(doc)
    return doc.body;
};

export const numberFormat = (i) => {
    let value = i
    value = value.replace(/[^0-9]/g, '')
    if (value.length > 3)
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return value
}

export const clearNumberFormat = (i) => {
    return parseFloat(i.replace(/,/g, ''))
}

export const mailValidation = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export const formatter = new Intl.NumberFormat('en-ID')

export function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export function delay(callback, ms) {
    let timer = 0;
    return function () {
        const context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}

export function tableTooltip() {
    const useTooltip = document.querySelectorAll('table tr td')
    if (useTooltip) {
        useTooltip.forEach((elm, index) => {
            if (elm.offsetWidth < elm.scrollWidth) {
                const title = $(elm).closest('table').find('th').eq($(elm).index())[0].innerText
                const textContent = $(elm).html()
                const classList = elm.classList.value
                $(elm).replaceWith(`
                    <td class="${classList}">
                        <div class="truncate popover-trigger" data-popover-target="popover-default-${index}" data-popover-placement="right">
                            ${textContent}
                        </div>
                        <div data-popover id="popover-default-${index}" role="tooltip" class="popover invisible transition-opacity opacity-0">
                            <div class="popover-header">
                                <h3 class="title">${title}</h3>
                            </div>
                            <div class="popover-content">
                                <p class="whitespace-normal overflow-auto">${textContent}</p>
                            </div>
                            <div data-popper-arrow></div>
                        </div>
                    </td>
                `)
            }
        })
    }
}

export const triggerTableTooltip = () => {
    const popoverTrigger = document.querySelectorAll('.popover-trigger')
    // console.log(popoverTrigger)
    popoverTrigger.forEach((elm) => {
        const indexElm = elm.getAttribute('data-popover-target').split('-')[2]
        const targetElm = document.getElementById(`popover-default-${indexElm}`)
        const options = {
            placement: 'right',
            triggerType: 'hover',
            offset: 0,
        }

        new Popover(targetElm, elm, options)
    })
}

export function handleFixedTheadTh() {
    const tableFixedTh = document.querySelectorAll('table thead tr th[data-sticky]')
    if (tableFixedTh) {
        tableFixedTh.forEach((elm) => {
            const lw = elm.getAttribute('data-sticky-lw')
            const rw = elm.getAttribute('data-sticky-rw')
            const bpExclude = elm.getAttribute('data-sticky-bp-ex')
            const classListLw = `sticky !shadow-[inset_-1px_-1px_0_#f1f1f1,inset_0_1px_0_#f1f1f1]`
            const classListRw = `sticky !shadow-[inset_1px_-1px_0_#f1f1f1,inset_0_1px_0_#f1f1f1]`
            renderFixedTable(elm, bpExclude, lw, rw, classListLw, classListRw)
        })
    }
}

export function handleFixedTd() {
    const tableFixedTd = document.querySelectorAll('table tr td[data-sticky]')
    if (tableFixedTd) {
        tableFixedTd.forEach((elm) => {
            const lw = elm.getAttribute('data-sticky-lw')
            const rw = elm.getAttribute('data-sticky-rw')
            const bpExclude = elm.getAttribute('data-sticky-bp-ex')
            const classListLw = `sticky-td sticky bg-white shadow-[inset_-1px_0_0_#f1f1f1]`
            const classListRw = `sticky-td sticky bg-white shadow-[inset_1px_0_0_#f1f1f1]`
            renderFixedTable(elm, bpExclude, lw, rw, classListLw, classListRw)
        })
    }
}

export function handleFixedTfootTh() {
    const tableFixedTh = document.querySelectorAll('table tfoot tr th[data-sticky]')
    if (tableFixedTh) {
        tableFixedTh.forEach((elm) => {
            const lw = elm.getAttribute('data-sticky-lw')
            const rw = elm.getAttribute('data-sticky-rw')
            const bpExclude = elm.getAttribute('data-sticky-bp-ex')
            const classListLw = `sticky !shadow-[inset_-1px_0_0_#f1f1f1,inset_0_0_0_#f1f1f1,inset_0_0_0_#f1f1f1] z-[10]`
            const classListRw = `sticky !shadow-[inset_1px_0_0_#f1f1f1,inset_0_0_0_#f1f1f1,inset_0_0_0_#f1f1f1] z-[10]`
            renderFixedTable(elm, bpExclude, lw, rw, classListLw, classListRw)
        })
    }
}

function renderFixedTable(elm, bpExclude, lw, rw, classListLw, classListRw) {
    if (bpExclude) {
        if (bpExclude.split(',').indexOf(getDeviceConfig(window.innerWidth)) === -1) {
            if (lw) {
                $(elm).addClass(classListLw)
                $(elm).css('left', lw).css('z-index', 10)
            }
            if (rw) {
                $(elm).addClass(classListRw)
                $(elm).css('right', rw)
            }
        } else {
            if (lw) {
                $(elm).removeClass(classListLw)
                $(elm).removeAttr('style')
            }
            if (rw) {
                $(elm).removeClass(classListRw)
                $(elm).removeAttr('style')
            }
        }
    } else {
        if (lw) {
            $(elm).addClass(classListLw)
            $(elm).css('left', lw)
            $(elm).css('left', lw).css('z-index', 10)
        }
        if (rw) {
            $(elm).addClass(classListRw)
            $(elm).css('right', rw)
        }
    }
}

export const renderPagination = (response) => {
    const pagiLabelFrom = document.querySelector('.pagiLabelFrom')
    const pagiLabelTo = document.querySelector('.pagiLabelTo')
    const pagiLabelTotal = document.querySelector('.pagiLabelTotal')
    const pagiPrevLink = document.querySelector('.pagiPrevLink')
    const pagiLoopLink = document.querySelector('.pagiLoopLink')
    const pagiNextLink = document.querySelector('.pagiNextLink')

    const {links, next_page_url, prev_page_url, from, to, total} = response
    $(pagiLabelFrom).html(from)
    $(pagiLabelTo).html(to)
    $(pagiLabelTotal).html(total)

    //region Handle Pagination Prev Button
    let pagiPrev = `
            <span aria-disabled="true" aria-label="{{ __('pagination.previous') }}">
                <span class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-300 bg-white border border-gray-200 cursor-default rounded-l-md leading-5" aria-hidden="true">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                </span>
            </span>
        `
    if (prev_page_url !== null) {
        pagiPrev = `
                <a data-url="${prev_page_url}" rel="prev" class="pagiPrevActive cursor-pointer relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-l-md leading-5 hover:text-gray-400 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="{{ __('pagination.previous') }}">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                </a>
            `
    }
    $(pagiPrevLink).html(pagiPrev)
    const pagiPrevActive = document.querySelector('.pagiPrevActive')
    if (pagiPrevActive) {
        pagiPrevActive.addEventListener('click', function () {
            const dataUrl = this.dataset.url
            renderDataTender({
                url: dataUrl
            })
        })
    }
    //endregion

    //region Handle Pagination Next Button
    let pagiNext = `
            <span aria-disabled="true" aria-label="{{ __('pagination.next') }}">
                <span class="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-300 bg-white border border-gray-200 cursor-default rounded-r-md leading-5" aria-hidden="true">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                    </svg>
                </span>
            </span>
        `
    if (next_page_url !== null) {
        pagiNext = `
                <a data-url="${next_page_url}" rel="next" class="pagiNextActive cursor-pointer relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-r-md leading-5 hover:text-gray-400 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="{{ __('pagination.next') }}">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                    </svg>
                </a>
            `
    }
    $(pagiNextLink).html(pagiNext)
    const pagiNextActive = document.querySelector('.pagiNextActive')
    if (pagiNextActive) {
        pagiNextActive.addEventListener('click', function () {
            const dataUrl = this.dataset.url
            renderDataTender({
                url: dataUrl
            })
        })
    }
    //endregion

    //region Handle Pagination Loop Button
    const pagiLink = []
    links.map((item, index) => {
        const {url, label, active} = item
        if (index !== 0 && index !== links.length - 1) {
            let pLink = `
                    <a data-url="${url}" class="pagiLinkActive cursor-pointer relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-200 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="{{ __('Go to page :page', ['page' => ${label}]) }}">
                        ${label}
                    </a>
                `
            if (active) {
                pLink = `
                        <span aria-current="page">
                            <span class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-blue-600 border border-gray-300 cursor-default leading-5">
                                ${label}
                            </span>
                        </span>
                    `
            }
            pagiLink.push(pLink)
        }
    })

    $(pagiLoopLink).html(pagiLink)
    const pagiLinkActive = document.querySelectorAll('.pagiLinkActive')
    if (pagiLinkActive) {
        pagiLinkActive.forEach((elm) => {
            const dataUrl = elm.getAttribute('data-url')
            if (dataUrl !== 'null') {
                elm.addEventListener('click', async function () {
                    renderDataTender({
                        url: dataUrl
                    })
                })
            }
        })
    }
    //endregion
}

export const handleReadMoreText = () => {
    const formGroupDetail = document.querySelectorAll('.form-group-detail.posible-long')
    if (formGroupDetail) {
        formGroupDetail.forEach((elm) => {
            const textContent = $.trim($(elm).text()).replace(/<p>|<\/p>/g, '')
            const classList = elm.classList.value
            const checkParseText = $.trim($(elm).text()).replace(/<[^>]*>?/g, '')
            if (checkParseText.length > 135) {
                const subLengthText = 135
                $(elm).replaceWith(`
                    <div class="${classList}">
                        <div class="trim-text">
                            <span>${$.trim(textContent.substring(0, subLengthText))}</span>
                            <span class="dot">...</span>
                            <span class="on-full hidden">${textContent.substring(subLengthText, textContent.length)}</span>
                        </div>
                        <span class="read-more btnReadMore">Read More</span>
                    </div>
                `)
            } else {
                $(elm).replaceWith(`
                    <div class="${classList}">
                        <div class="trim-text">${textContent}</div>
                    </div>
                `)
            }
        })
    }

    const btnReadMore = document.querySelectorAll('.btnReadMore')
    if (btnReadMore) {
        btnReadMore.forEach((elm) => {
            elm.addEventListener('click', function () {
                const upSiblingDot = $(elm).closest('div.form-group-detail.posible-long').find('span.dot')[0]
                const upSiblingShort = $(elm).closest('div.form-group-detail.posible-long').find('span.on-full')[0]
                if (checkClassList(upSiblingShort, 'hidden')) {
                    hiddenElm(upSiblingDot)
                    removeElmClass(upSiblingShort, 'hidden')
                    elm.innerText = 'Read Less'
                } else {
                    hiddenElm(upSiblingShort)
                    removeElmClass(upSiblingDot, 'hidden')
                    elm.innerText = 'Read More'
                }
            })
        })
    }
}

export const query_search = (function (a) {
    if (a === "")
        return {}
    let b = {}
    for (let i = 0; i < a.length; ++i) {
        let p = a[i].split('=', 2);
        if (p.length !== 1) {
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
    }
    return b;
})(window.location.search.substring(1).split('&'));

export const singkatNama = (nama, singkatAfter) => {
    const kata = nama.split(' ')
    const jumlahKata = kata.length

    const singkatDari = singkatAfter || 2
    let singkatan = '';
    for (let i = 0; i < jumlahKata; i++) {
        if (i >= singkatDari) {
            if (typeof kata[i][0] !== 'undefined') {
                singkatan += kata[i][0] + '.';
            }
        } else {
            singkatan += kata[i] + ' ';
        }
    }

    return singkatan;
}

export const potongNama = (nama) => {
    const kata = nama.split(' ')
    const jumlahKata = kata.length

    let potong = '';
    for (let i = 0; i < jumlahKata; i++) {
        if (i <= 1) {
            potong += kata[i] + ' '
        }
    }

    return potong;
}

export function joinString(arr) {
    if (arr.length === 1) return arr[0];
    const firsts = arr.slice(0, arr.length - 1);
    const last = arr[arr.length - 1];
    return firsts.join(', ') + ' dan ' + last;
}

export const handleDropdown = () => {
    const triggerElm = document.querySelectorAll('[data-dropdown-ex]')
    triggerElm.forEach((elm) => {
        const target = elm.getAttribute('data-dropdown-ex')
        const targetElm = document.getElementById(target)
        const options = {
            placement: 'bottom',
            triggerType: 'click',
            offsetSkidding: -80,
            offsetDistance: 10,
            delay: 300,
        }
        new Dropdown(targetElm, elm, options)
    })
}
