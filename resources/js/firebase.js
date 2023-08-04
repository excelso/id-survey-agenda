import {initializeApp} from "firebase/app"
import {getMessaging, getToken, onMessage} from "firebase/messaging"

export const firebaseStoreToken = (options) => {
    const {csrfToken, firebaseReqToken} = options
    return new Promise(async (resolve, reject) => {
        const response = await fetch('/notifikasi/firebase/save-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({
                firebaseReqToken
            })
        })

        const {status} = response
        const {message} = await response.json()
        if (status === 200) {
            resolve()
        } else {
            reject(message)
        }
    })
}
