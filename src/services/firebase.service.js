import firebase from 'firebase/app'
import 'firebase/auth'
import router from '@/router'
import store from '@/store'
import { UPDATE_USER_STATE, CLEAR_USER_STATE } from '@/store/modules/user/mutations.types'
import { CHANGE_APP_STATUS } from '@/store/modules/app/mutations.types'


firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
})

let isAppInit = false
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.commit(`user/${ UPDATE_USER_STATE }`, user)

    if (!isAppInit && router.history.current.name === 'Signin') {
      isAppInit = true
      router.push(router.history.current.query.redirect || { name: 'Home' })
    }

  } else {
    store.commit(`user/${ CLEAR_USER_STATE }`)

  }

  store.commit(`app/${CHANGE_APP_STATUS}`, 0)
})
