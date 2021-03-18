import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
if(!firebase.apps.length) {
const firebaseConfig = {
    apiKey: "AIzaSyBGktdEAZ_dyTEpGRfPyKXp9R8icFMMm2w",
    authDomain: "nuxt-login-project.firebaseapp.com",
    projectId: "nuxt-login-project",
    storageBucket: "nuxt-login-project.appspot.com",
    messagingSenderId: "553491757672",
    appId: "1:553491757672:web:6b74b258e5d207a13699dd",
    measurementId: "G-RPF60XYELF"
  }
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const db = firebase.firestore()