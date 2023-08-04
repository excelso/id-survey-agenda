importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCKj9hJgLCgmTPi_BSl1tZxwnNXOdNPfmY",
    authDomain: "sucofindo-crm.firebaseapp.com",
    projectId: "sucofindo-crm",
    storageBucket: "sucofindo-crm.appspot.com",
    messagingSenderId: "352080572976",
    appId: "1:352080572976:web:df48a91fe8d53c0e56f3f5",
    measurementId: "G-SHXWLKNQ5R"
})
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
    self.clients.matchAll({includeUncontrolled: true}).then(clients => {
        clients.forEach(client => {
            client.postMessage(payload)
        })
    })
});
