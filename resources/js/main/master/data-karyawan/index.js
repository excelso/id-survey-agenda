import {closeModalDialog, showModalDialog} from "@/js/plugins/modal"
import {getMetaContent, hiddenElm, showHiddenElmAndText} from "@/js/plugins/functions"
import {closeAlert, confirmAlert, failureAlert, successAlert, waitLoader} from "@/js/plugins/sweet-alert"
import {setTriggerSelected} from "@/js/plugins/select2-custom"

document.addEventListener('DOMContentLoaded', function () {
    const csrfToken = getMetaContent('csrf-token')
    const btnTambah = document.querySelector('.btnTambah')
    const modalForm = document.querySelector('.modalForm')
    const closeModalForm = document.querySelectorAll('.closeModalForm')
    const userId = document.querySelector('.userId')
    const npp = document.querySelector('.npp')
    const nppError = document.querySelector('.nppError')
    const nppErrorText = document.querySelector('.nppErrorText')
    const namaKaryawan = document.querySelector('.namaKaryawan')
    const namaKaryawanError = document.querySelector('.namaKaryawanError')
    const namaKaryawanErrorText = document.querySelector('.namaKaryawanErrorText')
    const emailKaryawan = document.querySelector('.emailKaryawan')
    const emailKaryawanError = document.querySelector('.emailKaryawanError')
    const emailKaryawanErrorText = document.querySelector('.emailKaryawanErrorText')
    const emailKaryawanOld = document.querySelector('.emailKaryawanOld')
    const btnLookPassword = document.querySelector('.btnLookPassword')
    const passwordKaryawan = document.querySelector('.passwordKaryawan')
    const passwordKaryawanError = document.querySelector('.passwordKaryawanError')
    const passwordKaryawanErrorText = document.querySelector('.passwordKaryawanErrorText')
    const btnLookRePassword = document.querySelector('.btnLookRePassword')
    const rePasswordKaryawan = document.querySelector('.rePasswordKaryawan')
    const rePasswordKaryawanError = document.querySelector('.rePasswordKaryawanError')
    const rePasswordKaryawanErrorText = document.querySelector('.rePasswordKaryawanErrorText')
    const timezone = document.querySelector('.timezone')
    const timezoneError = document.querySelector('.timezoneError')
    const timezoneErrorText = document.querySelector('.timezoneErrorText')
    const roleId = document.querySelector('.roleId')
    const roleError = document.querySelector('.roleError')
    const roleErrorText = document.querySelector('.roleErrorText')
    const statusKaryawan = document.querySelector('.statusKaryawan')
    const btnCariKaryawan = document.querySelector('.btnCariKaryawan')
    const btnHapus = document.querySelector('.btnHapus')
    const btnSimpan = document.querySelector('.btnSimpan')
    const dataTables = document.querySelectorAll('.data-tables')
    const btnPencarian = document.querySelector('.btnPencarian')
    const modalPencarian = document.querySelector('.modalPencarian')

    closeModalForm.forEach((elm) => {
        elm.addEventListener('click', function () {
            closeModalDialog(modalForm, function () {
                hiddenElm(nppError)
                hiddenElm(namaKaryawanError)
                hiddenElm(emailKaryawanError)
                hiddenElm(passwordKaryawanError)
                hiddenElm(rePasswordKaryawanError)
                hiddenElm(timezoneError)
                hiddenElm(roleError)

                npp.value = ''
                npp.disabled = false
                namaKaryawan.value = ''
                emailKaryawan.value = ''
                emailKaryawanOld.value = ''
                passwordKaryawan.value = ''
                rePasswordKaryawan.value = ''
                setTriggerSelected(timezone, '')
                setTriggerSelected(roleId, '')
            })

            closeModalDialog(modalPencarian)
        })
    })

    if (btnPencarian !== null) {
        btnPencarian.addEventListener('click', function () {
            showModalDialog(modalPencarian, null, () => {
                const email = modalPencarian.querySelector('[name="email"]')

                email.value = ''

                const btnCari = document.querySelector('.btnCari')
                modalPencarian.addEventListener('keypress', function (ev) {
                    if (ev.which === 13) {
                        $(btnCari).trigger('click');
                    }
                })

                btnCari.addEventListener('click', function () {
                    const elmPencarian = modalPencarian.querySelectorAll('[name]')
                    const text_result = []
                    elmPencarian.forEach((elm) => {
                        const elmNames = elm.getAttribute('name')
                        if (elm.value !== '')
                            text_result.push(`${elmNames}=${elm.value}`)
                    })

                    window.location = `/master/karyawan?${text_result.join('&')}`
                })
            })
        })
    }

    if (btnLookPassword) {
        btnLookPassword.addEventListener('click', function () {
            let currentType = passwordKaryawan.getAttribute('type') === 'password' ? 'text' : 'password'
            let currentTypeIcon = passwordKaryawan.getAttribute('type') === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash'
            passwordKaryawan.setAttribute('type', currentType)
            btnLookPassword.innerHTML = `<i class="${currentTypeIcon}"></i>`
        })
    }

    if (btnLookRePassword) {
        btnLookRePassword.addEventListener('click', function () {
            let currentType = rePasswordKaryawan.getAttribute('type') === 'password' ? 'text' : 'password'
            let currentTypeIcon = rePasswordKaryawan.getAttribute('type') === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash'
            rePasswordKaryawan.setAttribute('type', currentType)
            btnLookRePassword.innerHTML = `<i class="${currentTypeIcon}"></i>`
        })
    }

    //region Handle Insert
    btnTambah.addEventListener('click', function () {
        showModalDialog(modalForm, '<i class="fas fa-plus-circle mr-2"></i> Tambah Karyawan', () => {
            npp.value = ''
            namaKaryawan.value = ''
            emailKaryawan.value = ''
            emailKaryawanOld.value = ''
            passwordKaryawan.value = ''
            rePasswordKaryawan.value = ''
            setTriggerSelected(timezone, '')
            setTriggerSelected(roleId, '')
            hiddenElm(btnHapus)

            btnSimpan.addEventListener('click', async function () {
                confirmAlert({
                    title: 'Konfirmasi',
                    html: 'Apakah anda akan menyimpan data Karyawan baru?',
                    confirmButtonText: 'Ya, Simpan',
                    showDenyButton: true,
                    denyButtonText: 'Tidak'
                }, handleSave)
            })
        })
    })

    const handleSave = async () => {
        await waitLoader('Mohon Tunggu...', 'Menyimpan data Karyawan baru', async () => {
            hiddenElm(nppError)
            hiddenElm(namaKaryawanError)
            hiddenElm(emailKaryawanError)
            hiddenElm(passwordKaryawanError)
            hiddenElm(rePasswordKaryawanError)
            hiddenElm(timezoneError)
            hiddenElm(roleError)

            const response = await fetch('karyawan/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({
                    npp: npp.value,
                    name: namaKaryawan.value,
                    email: emailKaryawan.value,
                    password: passwordKaryawan.value,
                    re_password: rePasswordKaryawan.value,
                    timezone: timezone.value,
                    role_id: roleId.value,
                    status_user: statusKaryawan.value,
                })
            })

            await handleResponse(response)
        })
    }
    //endregion

    //region Hendle Update dan Delete
    dataTables.forEach((el) => {
        const dataItems = el.getAttribute('data-items')
        const btnEdit = el.querySelector('.btnEdit')
        btnEdit.addEventListener('click', function () {
            showModalDialog(modalForm, '<i class="fas fa-edit mr-2"></i> Ubah Karyawan', () => {
                passwordKaryawan.value = ''
                showHiddenElmAndText(btnHapus)

                const {
                    id,
                    npp: data_npp,
                    name,
                    email,
                    timezone: tz,
                    role_id,
                    status_user,
                } = JSON.parse(dataItems)

                userId.value = id
                npp.value = data_npp
                npp.disabled = true
                namaKaryawan.value = name
                emailKaryawan.value = email
                emailKaryawanOld.value = email

                setTriggerSelected(timezone, tz)
                setTriggerSelected(roleId, role_id)
                setTriggerSelected(statusKaryawan, status_user)

                btnSimpan.addEventListener('click', async function () {
                    confirmAlert({
                        title: 'Konfirmasi',
                        html: 'Apakah anda akan menyimpan perubahan data Karyawan ini?',
                        confirmButtonText: 'Ya, Simpan',
                        showDenyButton: true,
                        denyButtonText: 'Tidak'
                    }, handleUpdate)
                })

                btnHapus.addEventListener('click', async function () {
                    confirmAlert({
                        title: 'Konfirmasi',
                        html: 'Apakah anda akan menghapus Karyawan ini?',
                        confirmButtonText: 'Ya, Hapus',
                        showDenyButton: true,
                        denyButtonText: 'Tidak'
                    }, handleDelete)
                })
            })
        })
    })

    const handleUpdate = async () => {
        await waitLoader('Mohon Tunggu...', 'Menyimpan perubahan data Karyawan', async () => {
            hiddenElm(nppError)
            hiddenElm(namaKaryawanError)
            hiddenElm(emailKaryawanError)
            hiddenElm(passwordKaryawanError)
            hiddenElm(rePasswordKaryawanError)
            hiddenElm(timezoneError)
            hiddenElm(roleError)

            const response = await fetch('karyawan/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({
                    user_id: userId.value,
                    npp: npp.value,
                    name: namaKaryawan.value,
                    email: emailKaryawan.value,
                    email_old: emailKaryawanOld.value,
                    password: passwordKaryawan.value,
                    re_password: rePasswordKaryawan.value,
                    timezone: timezone.value,
                    role_id: roleId.value,
                    status_user: statusKaryawan.value,
                })
            })

            await handleResponse(response)
        })
    }

    const handleDelete = async () => {
        await waitLoader('Mohon Tunggu...', 'Menghapus data Karyawan', async () => {
            const response = await fetch('karyawan/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({
                    user_id: userId.value,
                })
            })

            await handleResponse(response)
        })
    }
    //endregion

    //region Handle Response Data
    const handleResponse = async (response) => {
        const {status} = response
        const {message, errorValidation} = await response.json()
        if (status === 200) {
            closeModalDialog(modalForm)
            successAlert({
                title: 'Berhasil',
                html: message,
                confirmButtonText: 'Tutup'
            }, () => {
                window.location.reload()
            })
        } else {
            if (errorValidation) {
                closeAlert()
                const {
                    npp: data_npp,
                    name,
                    email,
                    password,
                    re_password,
                    timezone: tz,
                    role_id,
                } = errorValidation

                if (data_npp)
                    showHiddenElmAndText(nppError, nppErrorText, data_npp[0])
                if (name)
                    showHiddenElmAndText(namaKaryawanError, namaKaryawanErrorText, name[0])
                if (email)
                    showHiddenElmAndText(emailKaryawanError, emailKaryawanErrorText, email[0])
                if (password)
                    showHiddenElmAndText(passwordKaryawanError, passwordKaryawanErrorText, password[0])
                if (re_password)
                    showHiddenElmAndText(rePasswordKaryawanError, rePasswordKaryawanErrorText, re_password[0])
                if (tz)
                    showHiddenElmAndText(timezoneError, timezoneErrorText, tz[0])
                if (role_id)
                    showHiddenElmAndText(roleError, roleErrorText, role_id[0])
            } else {
                failureAlert({
                    html: message,
                    confirmButtonText: 'Tutup'
                })
            }
        }
    }
    //endregion
})
