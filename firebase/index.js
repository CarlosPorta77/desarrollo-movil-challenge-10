import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyDkXrdKBrg1Fo0KMENgTgH5Jp0q7a99pXE',
  authDomain: 'reactapp-1c9f3.firebaseapp.com',
  databaseURL: 'https://reactapp-1c9f3.firebaseio.com',
  projectId: 'reactapp-1c9f3',
  storageBucket: 'reactapp-1c9f3.appspot.com',
  messagingSenderId: '992998649150',
}

firebase.initializeApp(config)

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore()
export const auth = firebase.auth()

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true,
})

export const getCurrentUser = () => {
  if (auth.currentUser) {
    return Promise.resolve(auth.currentUser)
  }

  return auth
    .signInAnonymously()
    .then(() => auth.currentUser)
    .catch(error => console.error(error))
}

export default firebase
