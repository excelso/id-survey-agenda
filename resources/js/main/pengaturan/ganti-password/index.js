import {getMetaContent, hiddenElm, showHiddenElmAndText} from "@/js/plugins/functions";
import {closeAlert, confirmAlert, failureAlert, successAlert, waitLoader} from "@/js/plugins/sweet-alert";
import {closeModalDialog} from "@/js/plugins/modal";

document.addEventListener('DOMContentLoaded', function () {
    const csrfToken = getMetaContent('csrf-token')
    const passwordLama = document.querySelector('.passwordLama')
    const passwordLamaError = document.querySelector('.passwordLamaError')
    const passwordLamaErrorText = document.querySelector('.passwordLamaErrorText')
    const btnLookPasswordLama = document.querySelector('.btnLookPasswordLama')
    const passwordBaru = document.querySelector('.passwordBaru')
    const passwordBaruError = document.querySelector('.passwordBaruError')
    const passwordBaruErrorText = document.querySelector('.passwordBaruErrorText')
    const btnLookPasswordBaru = document.querySelector('.btnLookPasswordBaru')
    const rePasswordBaru = document.querySelector('.rePasswordBaru')
    const rePasswordBaruError = document.querySelector('.rePasswordBaruError')
    const rePasswordBaruErrorText = document.querySelector('.rePasswordBaruErrorText')
    const btnLookRePasswordBaru = document.querySelector('.btnLookRePasswordBaru')
    const btnSimpan = document.querySelector('.btnSimpan')

    if (btnLookPasswordLama) {
        btnLookPasswordLama.addEventListener('click', function () {
            let currentType = passwordLama.getAttribute('type') === 'password' ? 'text' : 'password'
            let currentTypeIcon = passwordLama.getAttribute('type') === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash'
            passwordLama.setAttribute('type', currentType)
            btnLookPasswordLama.innerHTML = `<i class="${currentTypeIcon}"></i>`
        })
    }

    if (btnLookPasswordBaru) {
        btnLookPasswordBaru.addEventListener('click', function () {
            let currentType = passwordBaru.getAttribute('type') === 'password' ? 'text' : 'password'
            let currentTypeIcon = passwordBaru.getAttribute('type') === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash'
            passwordBaru.setAttribute('type', currentType)
            btnLookPasswordBaru.innerHTML = `<i class="${currentTypeIcon}"></i>`
        })
    }

    if (btnLookRePasswordBaru) {
        btnLookRePasswordBaru.addEventListener('click', function () {
            let currentType = rePasswordBaru.getAttribute('type') === 'password' ? 'text' : 'password'
            let currentTypeIcon = rePasswordBaru.getAttribute('type') === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash'
            rePasswordBaru.setAttribute('type', currentType)
            btnLookRePasswordBaru.innerHTML = `<i class="${currentTypeIcon}"></i>`
        })
    }

    if (btnSimpan) {
        btnSimpan.addEventListener('click', function () {
            confirmAlert({
                title: 'Konfirmasi',
                html: 'Apakah anda akan mengganti Password baru?',
                confirmButtonText: 'Ya, Simpan',
                showDenyButton: true,
                denyButtonText: 'Tidak'
            }, async () => {
                await waitLoader('Mohon Tunggu...', 'Menyimpan Perubahan Password', async () => {
                    hiddenElm(passwordLamaError)
                    hiddenElm(passwordBaruError)
                    hiddenElm(rePasswordBaruError)

                    const response = await fetch('/pengaturan/ganti-password/update', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': csrfToken
                        },
                        body: JSON.stringify({
                            password_lama: passwordLama.value,
                            password_baru: passwordBaru.value,
                            re_password_baru: rePasswordBaru.value,
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
                            window.location.reload()
                        })
                    } else {
                        closeAlert()
                        if (errorValidation) {
                            const {
                                password_lama,
                                password_baru,
                                re_password_baru,
                            } = errorValidation

                            if (password_lama)
                                showHiddenElmAndText(passwordLamaError, passwordLamaErrorText, password_lama[0])
                            if (password_baru)
                                showHiddenElmAndText(passwordBaruError, passwordBaruErrorText, password_baru[0])
                            if (re_password_baru)
                                showHiddenElmAndText(rePasswordBaruError, rePasswordBaruErrorText, re_password_baru[0])

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
    }

})
