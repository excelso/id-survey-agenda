import {getMetaContent, hiddenElm, showHiddenElmAndText} from "@/js/plugins/functions"
import {closeModalDialog, showModalDialog} from "@/js/plugins/modal"
import {setTriggerSelected} from "@/js/plugins/select2-custom"
import {closeAlert, confirmAlert, failureAlert, successAlert, waitLoader} from "@/js/plugins/sweet-alert"

document.addEventListener('DOMContentLoaded', function () {
    const csrfToken = getMetaContent('csrf-token')
    const btnTambah = document.querySelector('.btnTambah')
    const modalForm = document.querySelector('.modalForm')
    const closeModalForm = document.querySelector('.closeModalForm')
    const periodeId = document.querySelector('.periodeId')
    const periode = document.querySelector('.periode')
    const periodeError = document.querySelector('.periodeError')
    const periodeErrorText = document.querySelector('.periodeErrorText')
    const status = document.querySelector('.status')
    const statusError = document.querySelector('.statusError')
    const statusErrorText = document.querySelector('.statusErrorText')
    const btnHapus = document.querySelector('.btnHapus')
    const btnSimpan = document.querySelector('.btnSimpan')
    const dataTables = document.querySelectorAll('.data-tables')

    closeModalForm.addEventListener('click', function () {
        closeModalDialog(modalForm, function () {
            hiddenElm(periodeError)
            hiddenElm(statusError)
            setTriggerSelected(periode, '')
            setTriggerSelected(status, '')
        })
    })

    btnTambah.addEventListener('click', function () {
        showModalDialog(modalForm)
    })

    if (btnSimpan !== null) {
        btnSimpan.addEventListener('click', function () {
            confirmAlert({
                title: 'Konfirmasi',
                html: 'Apakah anda akan menyimpan data Periode baru?',
                confirmButtonText: 'Ya, Simpan',
                showDenyButton: true,
                denyButtonText: 'Tidak'
            }, async () => {
                await handleSave({
                    url: 'periode-account/store',
                    body: {
                        periode: periode.value,
                        status: status.value,
                    }
                })
            })
        })
    }

    dataTables.forEach((el) => {
        const dataItems = el.getAttribute('data-items')
        const btnEdit = el.querySelector('.btnEdit')
        btnEdit.addEventListener('click', function () {
            showModalDialog(modalForm, '<i class="fas fa-edit"></i> Ubah Periode')
            showHiddenElmAndText(btnHapus)

            const {
                id,
                periode: data_periode,
                status: data_status,
            } = JSON.parse(dataItems)

            periodeId.value = id
            setTriggerSelected(periode, data_periode)
            setTriggerSelected(status, data_status)

            btnSimpan.addEventListener('click', async function () {
                confirmAlert({
                    title: 'Konfirmasi',
                    html: 'Apakah anda akan menyimpan perubahan data Periode ini?',
                    confirmButtonText: 'Ya, Simpan',
                    showDenyButton: true,
                    denyButtonText: 'Tidak'
                }, async () => {
                    await handleSave({
                        url: 'periode-account/update',
                        body: {
                            id: periodeId.value,
                            periode: periode.value,
                            status: status.value,
                        }
                    })
                })
            })

            btnHapus.addEventListener('click', async function () {
                confirmAlert({
                    title: 'Konfirmasi',
                    html: 'Apakah anda akan menghapus Periode ini?',
                    confirmButtonText: 'Ya, Hapus',
                    showDenyButton: true,
                    denyButtonText: 'Tidak'
                }, async () => {
                    await handleSave({
                        url: 'periode-account/delete',
                        method: 'DELETE',
                        body: {
                            id: periodeId.value,
                        }
                    })
                })
            })
        })
    })

    const handleSave = async (options) => {
        const {url, method, body, returnUrl} = options
        await waitLoader('Mohon Tunggu...', 'Menyimpan data Periode', async () => {
            const response = await fetch(url, {
                method: method || 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(body)
            })

            await handleResponse(response, returnUrl || null)
        })
    }

    //region Handle Response Data
    const handleResponse = async (response, returnUrl) => {
        const {status} = response
        const {message, errorValidation} = await response.json()
        if (status === 200) {
            closeModalDialog(modalForm)
            successAlert({
                title: 'Berhasil',
                html: message,
                confirmButtonText: 'Tutup'
            }, () => {
                if (returnUrl !== null) {
                    window.location.href = returnUrl
                } else {
                    window.location.reload()
                }
            })
        } else {
            if (errorValidation) {
                closeAlert()
                const {
                    periode: data_periode,
                    status: data_status,
                } = errorValidation

                if (data_periode)
                    showHiddenElmAndText(periodeError, periodeErrorText, data_periode[0])
                if (data_status)
                    showHiddenElmAndText(statusError, statusErrorText, data_status[0])
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
